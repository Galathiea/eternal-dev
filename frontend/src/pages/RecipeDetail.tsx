import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

interface Recipe {
  id: number;
  title: string;
  description: string;
  instructions: string;
  ingredients: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  price: string; // price as string from DRF
  category: { id: number; name: string } | null;
  image: string | null;
  created_at: string;
  updated_at: string;
  user?: number;
}

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      setRecipe(null);

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/recipes/${id}/`);

        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            if (errorData.detail) {
              errorMessage = errorData.detail;
            } else if (errorData.message) {
              errorMessage = errorData.message;
            }
          } catch (jsonError) {
            console.error("Failed to parse error response:", jsonError);
          }
          throw new Error(errorMessage);
        }

        const data: Recipe = await response.json();
        setRecipe(data);
      } catch (err: any) {
        console.error("Failed to fetch recipe:", err);
        setError(err.message || "An unexpected error occurred while loading the recipe.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (recipe) {
      addToCart({
        id: recipe.id.toString(),
        name: recipe.title,
        price: recipe.price,
        image: recipe.image || '',
        quantity: 1,
      });
      toast.success(`${recipe.title} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-xl text-gray-700">Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-4 rounded-lg shadow-md mx-auto max-w-md mt-12">
        <p className="text-xl text-red-700 font-semibold mb-2">Error Loading Recipe</p>
        <p className="text-red-600 text-center">{error}</p>
        <Link to="/recipes" className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
          Back to Recipes List
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-xl text-gray-700">Recipe not found.</p>
        <Link to="/recipes" className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          Browse All Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              {recipe.image ? (
                <img
                  className="h-full w-full object-cover"
                  src={recipe.image}
                  alt={recipe.title}
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Image Available
                </div>
              )}
            </div>
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
                <span>⏱️ {recipe.prep_time} min prep</span> •{" "}
                <span>🔥 {recipe.cook_time} min cook</span> •{" "}
                <span>🍽️ {recipe.servings} servings</span>
              </div>
              {recipe.category && (
                <div className="text-sm text-gray-500 mt-2">
                  Category: {recipe.category.name}
                </div>
              )}
              <h1 className="block mt-2 text-3xl leading-tight font-bold text-gray-900">
                {recipe.title}
              </h1>
              <p className="mt-2 text-gray-700">{recipe.description}</p>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-orange-700 mb-1">Ingredients</h2>
                <p className="text-gray-800 whitespace-pre-line">{recipe.ingredients}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-orange-700 mb-1">Instructions</h2>
                <p className="text-gray-800 whitespace-pre-line">{recipe.instructions}</p>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-xl font-bold text-green-700 mr-2">
                  ₱{parseFloat(recipe.price).toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm">(Price per serving)</span>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <Link
                  to="/recipes"
                  className="inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Back to Recipes List
                </Link>
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;