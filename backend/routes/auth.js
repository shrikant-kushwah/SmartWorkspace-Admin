const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");



// help for generate tokens
const createAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};


// help for generate refresh tokens
const createRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

// register route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.json({ ok: true });
    } catch (err) {
        console.error("Register error:", err.message);
        res.status(400).json({ error: err.message });
    }
});

// login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// refresh access token
router.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken)
        return res.status(401).json({ error: "Missing refresh token" });

    try {
        const payload = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(payload.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ error: "Invalid refresh token" });
        }

        const accessToken = createAccessToken(user);

        res.json({
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Refresh token error:", err.message);
        res.status(401).json({ error: "Invalid token" });
    }
});

// logout simply removes the refresh token
router.post("/logout", async (req, res) => {
    const { id } = req.body;

    try {
        await User.findByIdAndUpdate(id, { $unset: { refreshToken: 1 } });
        res.json({ ok: true });
    } catch (err) {
        console.error("Logout error:", err.message);
        res.status(500).json({ error: "Logout failed" });
    }
});

// forgot password => generates a reset token
router.post("/forgot", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });

    // do not reveal whether a user exists or not
    if (!user) return res.json({ ok: true });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 15 * 60 * 1000;

    user.resetToken = token;
    user.resetTokenExp = new Date(expiresAt);
    await user.save();

    const response = { ok: true };

    // only return token in development mode
    if (process.env.NODE_ENV !== "production") {
        response.token = token;
    }

    res.json(response);
});

// reset password
router.post("/reset", async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ error: "Invalid request" });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password too short (min 6 chars)" });
    }

    const user = await User.findOne({
        resetToken: token,
        resetTokenExp: { $gt: new Date() },
    });

    if (!user) {
        return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExp = undefined;

    // force re-login
    user.refreshToken = undefined;
    await user.save();

    res.json({ ok: true });
});

module.exports = router;
