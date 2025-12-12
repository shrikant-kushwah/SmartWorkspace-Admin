const jwt = require('jsonwebtoken');

// middleware for verifying JWT and optional role check
module.exports = function (allowedRoles = []) {
  return async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = header.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // if specific roles are required, check against the user's role
      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
