import React from "react";
import { useNavigate } from "react-router-dom";

type Category = {
  title: string;
  description: string;
  imageUrl: string;
  route: string;
};

const Categories: React.FC = () => {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      title: "Healthy Foods",
      description: "Nutritious and delicious recipes for a healthy lifestyle.",
      imageUrl: "/images/healthy-foods.jpg",
      route: "/healthy-foods"
    },
    {
      title: "Desserts",
      description: "Sweet treats to satisfy your cravings.",
      imageUrl: "/images/desserts.jpg",
      route: "/desserts"
    },
    {
      title: "Essential Ingredients",
      description: "Recipes featuring fresh, seasonal produce.",
      imageUrl: "/images/essential-ingredients.jpg",
      route: "/ingredients"
    },
    {
      title: "Main Dishes",
      description: "Easy recipes for meal prepping and planning.",
      imageUrl: "/images/main-dishes.jpg",
      route: "/main-dishes"
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-orange-100">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Recipe Categories</h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Browse our recipes by category to find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative flex flex-col h-full p-0 overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-xl hover:shadow-lg group"
            >
              {/* Image with zoom effect */}
              <div className="h-48 overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  {category.title}
                </h3>
                <p className="mb-4 text-gray-600">
                  {category.description}
                </p>
                
                {/* Lighter View Recipes button */}
                <div className="pt-4 mt-auto">
                  <button 
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-orange-600 transition-all duration-300 transform bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 hover:-translate-y-0.5"
                    onClick={() => navigate(category.route)}
                  >
                    <span>View Recipes</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;