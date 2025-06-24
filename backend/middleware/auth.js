const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Middleware to verify JWT and extract user data
const verifyUserToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID and email to the request
    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = {
  verifyUserToken
};
