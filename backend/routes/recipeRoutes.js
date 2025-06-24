const express = require('express');
const router = express.Router();

// Import controller methods for recipe operations
const {
  addNewRecipe,
  fetchAllRecipes,
  modifyRecipe,
  removeRecipe,
  getRecipeDetails,
  getMyRecipes
} = require('../controllers/recipeController');

// Import custom middleware for verifying user token
const { verifyUserToken } = require('../middleware/auth');

// Public route - get all recipes with optional search and pagination
router.get('/', fetchAllRecipes);

// Private route - get all recipes created by the logged-in user
router.get('/my-dishes', verifyUserToken, getMyRecipes);

// Private route - add a new recipe
router.post('/', verifyUserToken, addNewRecipe);

// Private route - update a specific recipe
router.put('/:id', verifyUserToken, modifyRecipe);

// Private route - delete a recipe by its ID
router.delete('/:id', verifyUserToken, removeRecipe);

// Public route - fetch a specific recipe by ID
router.get('/:id', getRecipeDetails);

module.exports = router;
