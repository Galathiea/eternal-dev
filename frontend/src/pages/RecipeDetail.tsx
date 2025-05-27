// src/pages/RecipeDetail.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const RecipeDetail: React.FC = () => {
  useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Recipe data - in a real app you would fetch this based on the ID
  const recipe = {
    id: "1", // changed to string to match CartItem interface
    name: "Creamy Garlic Pasta", // changed from title to name to match interface
    price: 12.99, // added price to match CartItem interface
    description: "A rich and creamy pasta dish with roasted garlic, parmesan cheese, and fresh herbs.",
    time: "30 min",
    servings: "4 servings",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=880&auto=format&fit=crop",
    ingredients: [
      "8 oz pasta",
      "4 cloves garlic, minced",
      "2 tbsp butter",
      "1 cup heavy cream",
      "1/2 cup grated parmesan",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Cook pasta according to package instructions.",
      "In a large pan, melt butter over medium heat.",
      "Add garlic and sauté until fragrant (about 1 minute).",
      "Pour in heavy cream and bring to a simmer.",
      "Stir in parmesan cheese until melted and smooth.",
      "Drain pasta and add to the sauce, tossing to coat.",
      "Season with salt and pepper.",
      "Garnish with fresh parsley and serve immediately."
    ]
  };

  const handleAddToCart = () => {
    addToCart({
      id: recipe.id,
      name: recipe.name,
      price: recipe.price,
      quantity: 1, // default quantity
      image: recipe.image,
      time: recipe.time,
      servings: recipe.servings
    });
    
    // Optional: Show feedback before navigating
    alert(`${recipe.name} added to cart!`);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-orange-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white shadow-md rounded-xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <img 
                className="object-cover w-full h-full" 
                src={recipe.image} 
                alt={recipe.name}
              />
            </div>
            <div className="p-8">
              <div className="text-sm font-semibold tracking-wide text-orange-600 uppercase">
                {recipe.difficulty} • {recipe.time} • {recipe.servings}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                {recipe.name}
              </h1>
              <p className="mt-3 text-base text-gray-600">{recipe.description}</p>
              <p className="mt-2 text-lg font-bold text-gray-800">${recipe.price.toFixed(2)}</p>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800">Ingredients</h2>
                <ul className="mt-2 list-disc list-inside">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800">Instructions</h2>
                <ol className="mt-2 list-decimal list-inside">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="mb-2 text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={handleAddToCart}
                  className="px-6 py-3 font-medium text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-700"
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