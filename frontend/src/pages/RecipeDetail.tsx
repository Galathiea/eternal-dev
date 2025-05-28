// src/pages/RecipeDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

interface Recipe {
  id: string;
  title: string;
  price: string;
  description: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  image: string;
  instructions: string;
  ingredients: string;
}

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://127.0.0.1:8000/api/recipes/${id}/`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || `Failed to fetch recipe: Status ${response.status}`);
        }

        const data: Recipe = await response.json();
        setRecipe(data);
      } catch (err: any) {
        console.error("Failed to fetch recipe:", err);
        setError(err.message || "An unexpected error occurred.");
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
        id: recipe.id,
        name: recipe.title,
        price: parseFloat(recipe.price),
        quantity: 1,
        image: recipe.image,
        time: `${recipe.prep_time + recipe.cook_time} min`,
        servings: recipe.servings.toString(),
      });
      toast.success(`${recipe.title} added to cart!`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>No recipe found.</div>;

  return (
    <div className="min-h-screen px-4 py-12 bg-orange-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white shadow-md rounded-xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <img
                className="object-cover w-full h-full"
                src={recipe.image}
                alt={recipe.title}
              />
            </div>
            <div className="p-8">
              <div className="text-sm font-semibold tracking-wide text-orange-600 uppercase">
                {recipe.difficulty} • Prep: {recipe.prep_time} min • Cook: {recipe.cook_time} min • Servings: {recipe.servings}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                {recipe.title}
              </h1>
              <p className="mt-3 text-base text-gray-600">{recipe.description}</p>
              <p className="mt-2 text-lg font-bold text-gray-800">
                ₱{parseFloat(recipe.price).toFixed(2)}
              </p>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-orange-700 mb-1">Ingredients</h2>
                <p className="text-gray-800 whitespace-pre-line">{recipe.ingredients}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-orange-700 mb-1">Instructions</h2>
                <p className="text-gray-800 whitespace-pre-line">{recipe.instructions}</p>
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