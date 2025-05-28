import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const { addToCart } = useCart();

  const featuredRecipes = [
    {
      id: 1,
      title: "Chicken Adobo",
      description: "It's a savory Filipino stew featuring chicken braised in vinegar, soy sauce, garlic, and black peppercorns, creating a deliciously tangy and umami-rich dish..",
      time: "55 min",
      servings: "4 servings",
      difficulty: "Easy",
      image: "https://plus.unsplash.com/premium_photo-1664391929657-f901ee7f1414?q=80&w=1953&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 7,
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
      description: "Tender chicken with a spicy marinade, fresh salsa, and mozzarella in red corn tortillas.",
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
      description: "Fresh vegetables, olives, feta cheese, and a tangy olive oil dressing.",
      time: "20 min",
      servings: "2 servings",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      title: "Beef Stir Fry",
      description: "Tender beef, broccoli, and colorful vegetables in a savory soy sauce.",
      time: "30 min",
      servings: "4 servings",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      title: "Blueberry Pancakes",
      description: "Fluffy pancakes filled with fresh blueberries and drizzled with maple syrup.",
      time: "25 min",
      servings: "2 servings",
      difficulty: "Easy",
      image: "https://plus.unsplash.com/premium_photo-1692193552327-3458ef3817c0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];

  const categories = [
    {
      title: "Healthy Foods",
      description: "Nutritious and delicious recipes for a healthy lifestyle.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1723118424218-54c1de8140c7?q=80&w=2153&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      route: "/healthy-foods"
    },
    {
      title: "Desserts",
      description: "Sweet treats to satisfy your cravings.",
      imageUrl: "https://images.unsplash.com/photo-1582461833047-2aeb4f8af173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      route: "/desserts"
    },
    {
      title: "Seasonal Ingredients",
      description: "Recipes featuring fresh, seasonal produce.",
      imageUrl: "https://images.unsplash.com/photo-1630708766674-f11932898dd7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      route: "/seasonal-ingredients"
    },
    {
      title: "Main Dishes",
      description: "Easy recipes for meal prepping and planning.",
      imageUrl: "https://images.unsplash.com/photo-1644647849404-bba4739704e3?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      route: "/main-dishes"
    },
  ];

  // Add to cart handler for featured recipes
  const handleAddToCart = (recipe: typeof featuredRecipes[0]) => {
    addToCart({
      id: String(recipe.id),
      name: recipe.title,
      price: 199.00, // Use number for price to match CartItem interface
      quantity: 1,
      image: recipe.image,
      time: recipe.time,
      servings: recipe.servings,
    });
    toast.success(`${recipe.title} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-orange-100">
      <div
        className="relative bg-cover bg-center h-[500px] flex items-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 px-8 mx-auto">
          <div className="max-w-md">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white">
              Discover Delicious Recipes for Every Occasion
            </h1>
            <p className="mb-8 text-lg text-white">
              Explore our collection of tasty recipes, cooking tips, and meal ideas for the whole family.
            </p>
            <div className="flex space-x-4">
              <Link to="/recipes" className="flex items-center gap-2 px-6 py-3 text-orange-600 transition-all duration-300 bg-white rounded-lg shadow-md hover:bg-orange-50 hover:shadow-lg">
                <span className="font-medium">Explore Recipes</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link to="/about" className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 bg-transparent border border-white rounded-lg shadow-md hover:bg-white/10 hover:shadow-lg">
                <span className="font-medium">Learn More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-16 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Featured Recipes</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Our most popular and highly-rated recipes that you'll love to try at home.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredRecipes.map((recipe, index) => (
            <div key={index} className="relative flex flex-col h-full p-0 overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-xl hover:shadow-lg group">
              <div className="h-48 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="flex flex-col flex-grow p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-800">{recipe.title}</h3>
                <p className="mb-4 text-gray-600">{recipe.description}</p>
                <div className="flex mb-4 space-x-4 text-sm text-gray-500">
                  <span>⏱️ {recipe.time}</span>
                  <span>🍽️ {recipe.servings}</span>
                  <span>📊 {recipe.difficulty}</span>
                </div>
                <div className="pt-4 mt-auto flex flex-col gap-2">
                  <Link 
                    to={`/recipes/${recipe.id}`}
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-orange-600 transition-all duration-300 transform bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 hover:-translate-y-0.5"
                  >
                    <span>View Recipe</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(recipe)}
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    <span>Add to Cart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.52 17h8.96a1 1 0 00.87-1.47L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container px-4 py-16 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Browse by Category</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Find recipes by category to quickly discover what you're looking for.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link 
              to={category.route} 
              key={index} 
              className="relative flex flex-col h-full p-0 overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-xl hover:shadow-lg group"
            >
              <div className="h-48 overflow-hidden">
                <img src={category.imageUrl} alt={category.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-800">{category.title}</h3>
                <p className="mb-4 text-gray-600">{category.description}</p>
                <div className="pt-4 mt-auto">
                  <div className="flex items-center justify-center w-full gap-2 px-4 py-2 text-orange-600 transition-all duration-300 transform bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 hover:-translate-y-0.5">
                    <span>Browse Category</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;