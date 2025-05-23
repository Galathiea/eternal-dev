import React from "react";

interface RecipeProps {
  title: string;
  description: string;
  time: string;
  servings: string;
  difficulty: string;
}

const Recipe: React.FC<RecipeProps> = ({ title, description, time, servings, difficulty }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="mb-4 text-gray-700">{description}</p>
      <div className="flex space-x-4 text-sm text-gray-600">
        <span>⏱️ {time}</span>
        <span>🍽️ {servings}</span>
        <span>📊 {difficulty}</span>
      </div>
    </div>
  );
};

export default Recipe;