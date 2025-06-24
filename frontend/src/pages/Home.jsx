import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes, deleteRecipe } from '../utils/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetchRecipes(searchTerm, page);
        setRecipes(response.data);
        setTotalPages(response.totalPages);
      } catch (err) {
        console.error('Failed to load recipes:', err.message);
      }
    };

    loadRecipes();
  }, [searchTerm, page]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');

    if (!confirmDelete) return;

    try {
      await deleteRecipe(id, token);
      const response = await fetchRecipes(searchTerm, page);
      setRecipes(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Failed to delete recipe:', err.message);
      alert('❌ Could not delete the recipe.');
    }
  };

  const handleEdit = (recipe) => {
    navigate(`/edit/${recipe._id}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Search input */}
      <input
        type="text"
        placeholder="🔍 Search by dish name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1); // Reset to first page on new search
        }}
        style={{
          display: 'block',
          margin: '0 auto 2rem',
          textAlign: 'center',
          width: '60%',
          padding: '12px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />

      {/* Recipe list or no-results UI */}
      {recipes.length === 0 ? (
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
            <p>Try searching for something else!</p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4065/4065579.png"
            alt="No recipes"
            style={{ width: '900px', height: '220px', objectFit: 'contain',marginLeft: '250px' }}
          />
        </div>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isOwner={userId === recipe.userId}
          />
        ))
      )}

      {/* Pagination controls */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          style={{ padding: '8px 12px', marginRight: '10px' }}
        >
          ⬅️ Previous
        </button>

        <span style={{ fontWeight: 'bold' }}>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          style={{ padding: '8px 12px', marginLeft: '10px' }}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Home;
