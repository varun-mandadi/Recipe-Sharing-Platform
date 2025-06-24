import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { createRecipe } from '../utils/api';

const AddRecipe = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleRecipeSubmit = async (newRecipe) => {
    try {
      await createRecipe(newRecipe, token);
      navigate('/');
    } catch (err) {
      console.error('Error adding recipe:', err.message);
      alert('❌ Could not add recipe. Please log in and try again.');
    }
  };

  return (
    <div style={{ width: '185%', boxSizing: 'border-box'}}>
      <h1 style={{ textAlign: 'center' }}>🍳 Add Recipe</h1>
      <RecipeForm onSubmit={handleRecipeSubmit} />
    </div>
  );
};

export default AddRecipe;
