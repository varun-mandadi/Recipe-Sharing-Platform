import React, { useState } from 'react';

const RecipeForm = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients?.join('\n') || '');
  const [instructions, setInstructions] = useState(initialData?.instructions?.join('\n') || '');
  const [preparationTime, setPreparationTime] = useState(initialData?.preparationTime || '');
  const [youtubeLink, setYoutubeLink] = useState(initialData?.youtubeLink || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: title.trim(),
      ingredients: ingredients.split('\n').map(line => line.trim()).filter(Boolean),
      instructions: instructions.split('\n').map(line => line.trim()).filter(Boolean),
      preparationTime: preparationTime.trim(),
      youtubeLink: youtubeLink.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="🍽️ Dish Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="🧂 Ingredients (one per line)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        rows={5}
        required
      />

      <textarea
        placeholder="👣 Cooking Steps (one step per line)"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        rows={6}
        required
      />

      <input
        type="text"
        placeholder="📺 YouTube Link (optional)"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
      />

      <input
        type="text"
        placeholder="⏱ Preparation Time (e.g., 30 minutes)"
        value={preparationTime}
        onChange={(e) => setPreparationTime(e.target.value)}
        required
      />

      <button type="submit">✅ Submit Recipe</button>
    </form>
  );
};

export default RecipeForm;
