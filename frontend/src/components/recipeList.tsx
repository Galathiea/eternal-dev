import React from "react";
import Recipe from "./recipe";

const RecipeList: React.FC = () => {
  const recipes = [
    {
      title: "Creamy Garlic Pasta",
      description: "A rich and creamy pasta dish with roasted garlic, parmesan cheese, and fresh herbs.",
      time: "30 min",
      servings: "4 servings",
      difficulty: "Easy",
    },
    {
      title: "Spicy Chicken Tacos",
      description: "Tender chicken with a spicy marinade, fresh salsa, and mozzarella in red corn tortillas.",
      time: "25 min",
      servings: "3 servings",
      difficulty: "Medium",
    },
    {
      title: "Chocolate Lava Cake",
      description: "Decadent chocolate cake with a molten center, served with vanilla ice cream.",
      time: "45 min",
      servings: "6 servings",
      difficulty: "Medium",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe, index) => (
        <Recipe key={index} {...recipe} />
      ))}
    </div>
  );
};

export default RecipeList;