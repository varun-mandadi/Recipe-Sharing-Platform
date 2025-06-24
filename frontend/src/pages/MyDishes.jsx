import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { fetchUserRecipes, deleteRecipe } from '../utils/api';

const MyDishes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchUserRecipes(token);
        setMyRecipes(data);
      } catch (err) {
        console.error('Failed to fetch user recipes:', err.message);
      }
    };

    loadRecipes();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (!confirmDelete) return;

    try {
      await deleteRecipe(id, token);
      setMyRecipes(prev => prev.filter(recipe => recipe._id !== id));
    } catch (err) {
      console.error('Failed to delete recipe:', err.message);
      alert('❌ Could not delete recipe.');
    }
  };

  const handleEdit = (recipe) => {
    navigate(`/edit/${recipe._id}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🍲 My Dishes</h2>

      {myRecipes.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f9fafb',
            padding: '3rem 5%',
            borderRadius: '12px',
            minHeight: '50vh'
          }}
        >
          <div style={{ fontSize: '1.6rem', color: '#555' }}>
            <p><strong>No recipes found.</strong></p>
            <p>Start by creating your first dish!</p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4065/4065579.png"
            alt="No recipes"
            style={{ width: '900px', height: '220px', objectFit: 'contain',marginLeft: '250px' }}
          />
        </div>
      ) : (
        myRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
            onEdit={handleEdit}
            isOwner={true}
          />
        ))
      )}
    </div>
  );
};

export default MyDishes;
