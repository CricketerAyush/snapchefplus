import React, { useEffect, useState } from "react";
import axios from "axios";

function RecipeList({ ingredients }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (ingredients.length === 0) return;
      const query = ingredients.join(",+");
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=5&apiKey=7fe09417666345ee954a7fbccad40d66`
      );
      setRecipes(res.data);
    };

    fetchRecipes();
  }, [ingredients]);

  return (
    <div className="mt-6 w-full max-w-3xl bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🍽 Recipes:</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="mb-4 border-b pb-4">
          <h3 className="text-xl font-semibold">{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} className="w-48 my-2" />
          <p>Used Ingredients: {recipe.usedIngredientCount}</p>
          <p>Missing Ingredients: {recipe.missedIngredientCount}</p>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
