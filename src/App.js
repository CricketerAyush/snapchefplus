import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import RecipeSuggestions from "./components/RecipeSuggestions";
import ExportButton from "./components/ExportButton";

function App() {
  const [ingredients, setIngredients] = useState([]);

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-6">👨‍🍳 SnapChef+</h1>

      {/* Search bar for manual input */}
      <input
        type="text"
        placeholder="Type ingredients (e.g. tomato, onion) and press Enter"
        className="mb-4 p-2 border rounded w-full max-w-md"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const items = e.target.value.split(",").map((item) => item.trim());
            setIngredients(items);
            e.target.value = "";
          }
        }}
      />

      {/* Image upload for detection */}
      <ImageUpload onDetect={setIngredients} />

      {/* Show detected ingredients */}
      {ingredients.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🧾 Detected Ingredients:</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recipes + Export */}
      {ingredients.length > 0 && (
        <>
          <div id="export-section">
            <RecipeSuggestions ingredients={ingredients} />
          </div>
          <ExportButton />
        </>
      )}
    </div>
  );
}

export default App;
