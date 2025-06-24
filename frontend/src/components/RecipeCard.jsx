import React from 'react';

const RecipeCard = ({ recipe, onEdit, onDelete, isOwner }) => {
  // Converts YouTube links into an embeddable format
  const formatYouTubeEmbed = (url) => {
    try {
      if (url.includes('watch?v=')) {
        return url.replace('watch?v=', 'embed/');
      } else if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1];
        return `https://www.youtube.com/embed/${id}`;
      }
      return '';
    } catch {
      return '';
    }
  };

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      
      {recipe.userEmail && (
        <p style={{ fontStyle: 'italic', color: '#555' }}>
          🧑‍🍳 Posted by: <strong>
            {recipe.userEmail.split('@')[0].charAt(0).toUpperCase() + recipe.userEmail.split('@')[0].slice(1)}
          </strong>
        </p>
      )}

      <p><strong>⏱ Preparation Time:</strong> {recipe.preparationTime}</p>

      <p><strong>🧂 Ingredients:</strong></p>
      <ul>
        {recipe.ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <p><strong>📖 Instructions:</strong></p>
      <ol>
        {recipe.instructions.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      {/* Embedded YouTube video */}
      {recipe.youtubeLink && (
        <div style={{ marginTop: '1.5rem' }}>
          <strong>🎥 Video Tutorial:</strong>
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <iframe
              width="560"
              height="315"
              style={{ borderRadius: '8px', maxWidth: '100%' }}
              src={formatYouTubeEmbed(recipe.youtubeLink)}
              title="YouTube tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Buttons for owner */}
      {isOwner && (
        <div style={{ marginTop: '1.5rem' }}>
          <button onClick={() => onEdit(recipe)} style={{ marginRight: '10px' }}>
            ✏️ Edit
          </button>
          <button onClick={() => onDelete(recipe._id)}>
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
