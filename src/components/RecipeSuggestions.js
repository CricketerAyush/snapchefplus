import React, { useEffect, useState } from "react";

const API_KEY = "7fe09417666345ee954a7fbccad40d66";

function RecipeSuggestions({ ingredients }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ingredients.length === 0) return;

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(
            ","
          )}&number=5&ranking=1&ignorePantry=true&apiKey=${API_KEY}`
        );
        const data = await response.json();

        const detailedRecipes = await Promise.all(
          data.map(async (recipe) => {
            const detailsRes = await fetch(
              `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.json?apiKey=${API_KEY}`
            );
            const details = await detailsRes.json();
            return {
              ...recipe,
              calories: details.calories || "N/A",
              protein: details.protein || "N/A",
              fat: details.fat || "N/A",
              carbs: details.carbs || "N/A",
              recipeUrl: `https://spoonacular.com/recipes/${recipe.title
                .toLowerCase()
                .replace(/ /g, "-")}-${recipe.id}`,
            };
          })
        );

        setRecipes(detailedRecipes);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [ingredients]);

  return (
    <div className="mt-6 w-full max-w-md bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🍽 Recipes You Can Make:</h2>
      {loading ? (
        <p className="text-gray-600">Loading recipes...</p>
      ) : (
        <ul className="space-y-4">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="flex items-start gap-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-16 h-16 rounded object-cover shadow"
              />
              <div>
                <a
                  href={recipe.recipeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-600 hover:underline"
                >
                  {recipe.title}
                </a>
                <p className="text-sm text-gray-700">
                  🔋 Calories: {recipe.calories}<br />
                  🥩 Protein: {recipe.protein} | 🧈 Fat: {recipe.fat} | 🍞 Carbs: {recipe.carbs}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeSuggestions;
