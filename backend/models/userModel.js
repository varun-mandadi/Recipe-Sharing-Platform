const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema for user data
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // normalize email input
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash the password before saving, only if it's new or changed
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.error('Error hashing password:', err.message);
    next(err);
  }
});

// Method to compare entered password with stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
