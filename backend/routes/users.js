const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// fetch all users => only admins should be able to see the full list
router.get("/", auth(["admin"]), async (req, res) => {
  try {
    const users = await User.find({}, "-password -refreshToken");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

// fetch the logged in users own profile
router.get("/me", auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id, "-password -refreshToken");
    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ error: "Unable to fetch profile" });
  }
});

module.exports = router;
