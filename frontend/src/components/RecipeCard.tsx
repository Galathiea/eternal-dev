import React from 'react';

interface Recipe {
  title: string;
  image: string;
  description: string;
  rating: number;
  time: string;
  servings: number;
  category: string;
  difficulty: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{recipe.title}</h3>
        <p className="mb-3 text-sm text-gray-600">{recipe.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>⭐ {recipe.rating}</span>
          <span>⏱ {recipe.time}</span>
          <span>🍽 {recipe.servings}</span>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="px-2 py-1 bg-gray-100 rounded">{recipe.category}</span>
          <span className="px-2 py-1 bg-gray-100 rounded">{recipe.difficulty}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;