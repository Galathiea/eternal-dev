// src/pages/RecipeDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch this data based on the ID
  const recipe = {
    id: 1,
    title: "Creamy Garlic Pasta",
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

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <img 
                className="h-full w-full object-cover" 
                src={recipe.image} 
                alt={recipe.title}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
                {recipe.difficulty} • {recipe.time} • {recipe.servings}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                {recipe.title}
              </h1>
              <p className="mt-3 text-gray-600">{recipe.description}</p>
              
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
                    <li key={index} className="text-gray-700 mb-2">{step}</li>
                  ))}
                </ol>
              </div>
              
              <div className="mt-8">
                <button className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
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