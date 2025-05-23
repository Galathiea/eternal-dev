import React from 'react';

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    image: string;
    cookTime: string;
    difficulty: 'Easy' | 'Medium' | 'Advanced';
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <p>Cook Time: {recipe.cookTime}</p>
      <p>Difficulty: {recipe.difficulty}</p>
    </div>
  );
};

export default RecipeCard;