const Recipe = require('../models/recipeModel');

// Add a new recipe for the logged-in user
const addNewRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe({
      ...req.body,
      userId: req.user.id ,
      userEmail: req.user.email // attach user ID from token
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error('Error creating recipe:', err.message);
    res.status(500).json({ message: 'Could not create recipe. Please try again.' });
  }
};

// Get a paginated list of recipes, with optional search
const fetchAllRecipes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const recipesPerPage = 5;
  const skipCount = (page - 1) * recipesPerPage;

  const searchFilter = req.query.search
    ? { title: { $regex: req.query.search, $options: 'i' } }
    : {};

  try {
    const recipeList = await Recipe.find(searchFilter)
      .skip(skipCount)
      .limit(recipesPerPage);

    const totalRecipes = await Recipe.countDocuments(searchFilter);

    res.status(200).json({
      data: recipeList,
      currentPage: page,
      totalPages: Math.ceil(totalRecipes / recipesPerPage)
    });
  } catch (err) {
    console.error('Failed to fetch recipes:', err.message);
    res.status(500).json({ message: 'Server issue. Please refresh or try later.' });
  }
};

// Edit an existing recipe (only if owner)
const modifyRecipe = async (req, res) => {
  try {
    const recipeToEdit = await Recipe.findById(req.params.id);

    if (!recipeToEdit || recipeToEdit.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not allowed to update this recipe.' });
    }

    Object.assign(recipeToEdit, req.body);
    await recipeToEdit.save();

    res.status(200).json(recipeToEdit);
  } catch (err) {
    console.error('Error updating recipe:', err.message);
    res.status(500).json({ message: 'Could not update recipe. Try again.' });
  }
};

// Delete a recipe (only if owner)
const removeRecipe = async (req, res) => {
  try {
    const recipeToDelete = await Recipe.findById(req.params.id);

    if (!recipeToDelete || recipeToDelete.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this.' });
    }

    await Recipe.deleteOne({ _id: req.params.id });
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error deleting recipe:', err.message);
    res.status(500).json({ message: 'Something went wrong while deleting.' });
  }
};

// Get a single recipe by its ID
const getRecipeDetails = async (req, res) => {
  try {
    const foundRecipe = await Recipe.findById(req.params.id);

    if (!foundRecipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }

    res.json(foundRecipe);
  } catch (err) {
    console.error('Error fetching recipe:', err.message);
    res.status(500).json({ message: 'Could not retrieve recipe.' });
  }
};

// Get all recipes created by the current user
const getMyRecipes = async (req, res) => {
  try {
    const userRecipes = await Recipe.find({ userId: req.user.id });
    res.status(200).json(userRecipes);
  } catch (err) {
    console.error('Error fetching user recipes:', err.message);
    res.status(500).json({ message: 'Failed to load your recipes.' });
  }
};

module.exports = {
  addNewRecipe,
  fetchAllRecipes,
  modifyRecipe,
  removeRecipe,
  getRecipeDetails,
  getMyRecipes
};
