import React from "react";
import { useNavigate } from "react-router-dom";

const Recipes: React.FC = () => {
  const navigate = useNavigate();

  const recipes = [
    {
      id: 1,
      title: "Creamy Garlic Pasta",
      description: "A rich and creamy pasta dish with roasted garlic, parmesan cheese, and fresh herbs.",
      time: "30 min",
      servings: "4 servings",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=880&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Spicy Chicken Tacos",
      description: "Tender chicken with a spicy marinade, fresh salsa, and avocado in soft corn tortillas.",
      time: "25 min",
      servings: "3 servings",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "Chocolate Lava Cake",
      description: "Decadent chocolate cake with a molten center, served with vanilla ice cream.",
      time: "45 min",
      servings: "6 servings",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      title: "Mediterranean Salad",
      description: "Fresh vegetables, olives, feta cheese, and a tangy lemon dressing.",
      time: "15 min",
      servings: "2 servings",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      title: "Beef Stir Fry",
      description: "Tender beef strips with colorful vegetables in a savory sauce, served over rice.",
      time: "20 min",
      servings: "4 servings",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      title: "Blueberry Pancakes",
      description: "Fluffy pancakes loaded with fresh blueberries and topped with maple syrup.",
      time: "20 min",
      servings: "3 servings",
      difficulty: "Easy",
      image: "https://plus.unsplash.com/premium_photo-1692193552327-3458ef3817c0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 7,
      title: "Vegetable Curry",
      description: "A fragrant and spicy curry with seasonal vegetables and coconut milk.",
      time: "40 min",
      servings: "4 servings",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 8,
      title: "Grilled Salmon",
      description: "Perfectly grilled salmon with lemon, herbs, and a mix of roasted vegetables.",
      time: "25 min",
      servings: "2 servings",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 9,
      title: "Homemade Pizza",
      description: "Crispy homemade pizza dough topped with fresh sauce, cheese, and your favorite toppings.",
      time: "50 min",
      servings: "4 servings",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 10,
      title: "Avocado Toast",
      description: "Creamy avocado on toasted sourdough bread with various toppings and seasonings.",
      time: "10 min",
      servings: "1 serving",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1628556820645-63ba5f90e6a2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 11,
      title: "Chicken Noodle Soup",
      description: "Comforting homemade chicken soup with vegetables, herbs, and egg noodles.",
      time: "45 min",
      servings: "5 servings",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 12,
      title: "Apple Pie",
      description: "Classic apple pie with a flaky crust, cinnamon-spiced filling, and vanilla ice cream.",
      time: "75 min",
      servings: "5 servings",
      difficulty: "Hard",
      image: "https://images.unsplash.com/photo-1635381471874-2b8999ca6a20?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

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

        {/* Recipe List */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="flex flex-col h-full overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg hover:border-orange-200"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
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
                <h2 className="mb-3 text-2xl font-semibold text-gray-800">{recipe.title}</h2>
                <p className="flex-grow mb-4 text-gray-600">{recipe.description}</p>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span>⏱️ {recipe.time}</span>
                  <span>🍽️ {recipe.servings}</span>
                  <span>📊 {recipe.difficulty}</span>
                </div>
                {/* The Recipes component already has IDs, just update the route in the button: */}
                <button 
                  className="self-start px-4 py-2 mt-4 text-sm font-medium text-orange-600 transition-colors duration-300 border border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/recipes/${recipe.id}`); // Updated route
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