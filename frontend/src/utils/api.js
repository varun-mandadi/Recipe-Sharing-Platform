import axios from 'axios';

// Base API URLs (set in .env)
const BASE_URL = import.meta.env.VITE_API_URL;
const RECIPE_API = `${BASE_URL}/api/recipes`;
const AUTH_API = `${BASE_URL}/api/auth`;

/* -------------------- Recipe APIs -------------------- */

// Fetch all recipes with optional search and pagination
export const fetchRecipes = async (search = '', page = 1) => {
  const response = await axios.get(`${RECIPE_API}?search=${search}&page=${page}`);
  return response.data;
};

// Create a new recipe (requires auth)
export const createRecipe = async (recipeData, token) => {
  const response = await axios.post(RECIPE_API, recipeData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Update an existing recipe by ID
export const updateRecipe = async (id, updatedData, token) => {
  const response = await axios.put(`${RECIPE_API}/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Delete a recipe by ID
export const deleteRecipe = async (id, token) => {
  await axios.delete(`${RECIPE_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Get a single recipe by its ID
export const fetchRecipeById = async (id) => {
  const response = await fetch(`${RECIPE_API}/${id}`);
  if (!response.ok) {
    throw new Error('Recipe not found');
  }
  return response.json();
};

// Get all recipes created by the logged-in user
export const fetchUserRecipes = async (token) => {
  const response = await axios.get(`${RECIPE_API}/my-dishes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

/* -------------------- Auth APIs -------------------- */

// Login user and receive token
export const loginUser = async (credentials) => {
  const response = await axios.post(`${AUTH_API}/login`, credentials);
  return response.data.token;
};

// Register a new user and receive token
export const registerUser = async (credentials) => {
  const response = await axios.post(`${AUTH_API}/register`, credentials);
  return response.data.token;
};
