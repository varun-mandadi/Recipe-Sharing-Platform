import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { fetchRecipeById, updateRecipe } from '../utils/api';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipeDetails = async () => {
      try {
        const data = await fetchRecipeById(id);
        setRecipeData(data);
      } catch (err) {
        console.error('Failed to load recipe:', err.message);
        alert('⚠️ Could not load recipe. Redirecting...');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadRecipeDetails();
  }, [id, navigate]);

  const handleRecipeUpdate = async (updatedRecipe) => {
    try {
      await updateRecipe(id, updatedRecipe, token);
      navigate('/');
    } catch (err) {
      console.error('Update failed:', err.message);
      alert('❌ Failed to update recipe. Please try again.');
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading recipe details...</p>;

  return (
    <div style={{ width: '185%', boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center' }}>Edit Recipe</h1>
      <RecipeForm initialData={recipeData} onSubmit={handleRecipeUpdate} />
    </div>
  );
};

export default EditRecipe;
