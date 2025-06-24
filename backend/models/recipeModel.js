const mongoose = require('mongoose');

// Schema for storing a recipe
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    default: []
  },
  instructions: {
    type: [String],
    default: []
  },
  preparationTime: {
    type: String,
    required: true
  },
  youtubeLink: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  userEmail: {
  type: String,
  default: ''
}
});

module.exports = mongoose.model('Recipe', recipeSchema);
