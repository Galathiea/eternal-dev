import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the interface for a single Recipe.
// This MUST match the fields your Django RecipeSerializer is sending
// when it lists all recipes.
interface Recipe {
  id: number;
  title: string;
  description: string;
  // Note: 'time' and 'difficulty' from your static data are NOT in the backend model.
  // We'll use prep_time and cook_time (numbers)
  prep_time: number; // From Django model
  cook_time: number;  // From Django model
  servings: number;
  // You might want to convert these to a more user-friendly string on the frontend
  // like "30 min" from `prep_time` + `cook_time`

  // Your backend `image` field will be a URL string
  image: string;

  // Assuming category is nested for list view as well (as in your detail serializer)
  category: { id: number; name: string; } | null;

  // Include other fields if your list serializer sends them
  // instructions: string; // Likely not needed in list view
  // ingredients: string;  // Likely not needed in list view
  price: number;
  created_at: string;
  updated_at: string;
}

const Recipes: React.FC = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your Django backend API URL for listing recipes
        const response = await fetch("http://127.0.0.1:8000/api/recipes/");

        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            if (errorData.detail) errorMessage = errorData.detail;
            else if (errorData.message) errorMessage = errorData.message;
          } catch (jsonError) {
            console.error("Failed to parse error response:", jsonError);
          }
          throw new Error(errorMessage);
        }

        const data: Recipe[] = await response.json();
        setRecipes(data);
      } catch (err: any) {
        console.error("Failed to fetch recipes:", err);
        setError(err.message || "An unexpected error occurred while loading recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // --- Conditional Rendering for Loading/Error States ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-100">
        <p className="text-xl text-gray-700">Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-4 rounded-lg shadow-md mx-auto max-w-md mt-12">
        <p className="text-xl text-red-700 font-semibold mb-2">Error Loading Recipes</p>
        <p className="text-red-600 text-center">{error}</p>
        {/* Optionally, add a retry button */}
        <button
          onClick={() => window.location.reload()} // Simple retry by reloading page
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-100">
        <p className="text-xl text-gray-700">No recipes found. Start by adding some!</p>
        {/* Optional: Link to a "Create Recipe" page if you have one */}
        {/* <Link to="/create-recipe" className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          Add New Recipe
        </Link> */}
      </div>
    );
  }

  // --- Render the Recipe List once data is fetched ---
  return (
    <div className="min-h-screen py-12 bg-orange-100">
      <div className="container px-4 mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">All Recipes</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Browse our collection of delicious recipes for everyday cooking. Find something that inspires you!
          </p>
        </div>

        {/* Recipe List Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="flex flex-col h-full overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg hover:border-orange-200 cursor-pointer" // Added cursor-pointer
              onClick={() => navigate(`/recipes/${recipe.id}`)} // Navigate on card click
            >
              {/* Recipe Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Recipe Content */}
              <div className="flex flex-col flex-grow p-6">
                {/* Category Display (if available) */}
                {recipe.category && (
                    <p className="text-sm text-orange-500 font-medium mb-1">
                        {recipe.category.name}
                    </p>
                )}
                <h2 className="mb-3 text-2xl font-semibold text-gray-800">{recipe.title}</h2>
                <p className="flex-grow mb-4 text-gray-600">{recipe.description}</p>

                {/* Time, Servings, Price */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span>⏱️ Prep: {recipe.prep_time} min</span>
                  <span>🔥 Cook: {recipe.cook_time} min</span>
                  <span>🍽️ {recipe.servings} servings</span>
                  <span>💰 ${typeof recipe.price === "number" ? recipe.price.toFixed(2) : "N/A"}</span>
                  {/* Note: 'difficulty' from static data is not in your backend model. Remove or implement if added to backend. */}
                </div>

                {/* View Recipe Button (redundant if card is clickable, but can keep for explicit UX) */}
                <button
                  className="self-start px-4 py-2 mt-4 text-sm font-medium text-orange-600 transition-colors duration-300 border border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card onClick from firing again
                    navigate(`/recipes/${recipe.id}`);
                  }}
                >
                  View Recipe →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;