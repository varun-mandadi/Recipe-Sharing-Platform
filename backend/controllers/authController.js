const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Generate a token for the user to use for future authenticated requests
const createAuthToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email
  };

  const options = {
    expiresIn: `${process.env.JWT_EXPIRY}d`
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Handle new user registration
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    const token = createAuthToken(newUser);
    res.status(201).json({ token });
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
};

// Handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const passwordMatch = await foundUser.comparePassword(password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = createAuthToken(foundUser);
    res.status(200).json({ token });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
