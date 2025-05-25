import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const categoryMap = {
  'healthy-foods': {
    title: 'Healthy Foods',
    description: 'Nutritious and delicious recipes for a healthy lifestyle.',
  },
  'desserts': {
    title: 'Desserts',
    description: 'Sweet treats to satisfy your cravings.',
  },
  'essential-ingredients': {
    title: 'Essential Ingredients',
    description: 'Recipes featuring fresh, seasonal produce.',
  },
  'main-dishes': {
    title: 'Main Dishes',
    description: 'Easy recipes for meal prepping and planning.',
  }
};

const getRecipesByCategory = (slug: string) => {
  const allRecipes = [
    {
      id: 1,
      name: 'Creamy Garlic Pasta',
      category: 'main-dishes',
      time: '30 min',
      servings: 4,
      difficulty: 'Easy',
      description: 'A rich and creamy pasta dish with roasted garlic, parmesan cheese, and fresh herbs.',
      image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=1170&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Spicy Chicken Tacos',
      category: 'main-dishes',
      time: '25 min',
      servings: 3,
      difficulty: 'Medium',
      description: 'Tender chicken with a spicy marinade, fresh salsa, and avocado in soft corn tortillas.',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1024&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Chocolate Lava Cake',
      category: 'desserts',
      time: '45 min',
      servings: 6,
      difficulty: 'Medium',
      description: 'Decadent chocolate cake with a molten center, served with vanilla ice cream.',
      image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=1032&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Mediterranean Salad',
      category: 'healthy-foods',
      time: '15 min',
      servings: 2,
      difficulty: 'Easy',
      description: 'Fresh vegetables, olives, feta cheese, and a tangy lemon dressing.',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1074&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Beef Stir Fry',
      category: 'main-dishes',
      time: '20 min',
      servings: 4,
      difficulty: 'Medium',
      description: 'Tender beef strips with colorful vegetables in a savory sauce.',
      image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1035&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'Blueberry Pancakes',
      category: 'healthy-foods',
      time: '25 min',
      servings: 3,
      difficulty: 'Easy',
      description: 'Fluffy pancakes loaded with fresh blueberries and drizzled with maple syrup.',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1080&auto=format&fit=crop'
    }
  ];

  return allRecipes.filter(recipe => recipe.category === slug);
};

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  
  if (!slug) {
    return (
      <div className="min-h-screen bg-orange-50 py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-orange-800 mb-6">All Categories</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(categoryMap).map(([categorySlug, category]) => (
              <Link 
                key={categorySlug} 
                to={`/categories/${categorySlug}`}
                className="overflow-hidden transition-all bg-white rounded-lg shadow-md hover:shadow-lg hover:border-orange-300 border border-transparent"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-orange-700 mb-2">{category.title}</h2>
                  <p className="text-orange-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const category = categoryMap[slug as keyof typeof categoryMap] || {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: "Explore our collection of recipes.",
  };

  const categoryRecipes = getRecipesByCategory(slug);

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/categories"
            className="inline-flex items-center text-orange-600 hover:text-orange-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Categories
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-800 mb-2">{category.title}</h1>
          <p className="text-orange-700">{category.description}</p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-orange-800">All Recipes</h2>
          <p className="text-orange-700 mb-6">
            Browse our collection of delicious {category.title.toLowerCase()} recipes. Find something that inspires you!
          </p>

          <div className="space-y-8">
            {categoryRecipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="overflow-hidden transition-all bg-white rounded-lg shadow-md hover:shadow-lg hover:border-orange-300 border border-transparent"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="object-cover w-full h-48 md:h-full"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-2xl font-bold text-orange-800 mb-2">{recipe.name}</h3>
                    <p className="text-orange-700 mb-4">{recipe.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-orange-600 mb-4">
                      <span>{recipe.time}</span>
                      <span>•</span>
                      <span>{recipe.servings} servings</span>
                      <span>•</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                    
                    <div className="border-t border-orange-200 pt-4">
                      <Link
                        to={`/recipes/${recipe.id}`}  // Changed from /recipes-detailes to /recipes
                        className="inline-block px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;