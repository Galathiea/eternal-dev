import React from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecipeCard from '@/components/RecipeCard';


const categoryMap = {
  'healthy-foods': {
    title: 'Healthy Foods',
    description: 'Nutritious and delicious recipes for a healthy lifestyle.',
    image: "https://plus.unsplash.com/premium_photo-1723118424218-54c1de8140c7?q=80&w=2153&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  'desserts': {
    title: 'Desserts',
    description: 'Sweet treats to satisfy your cravings.',
    image: 'https://images.unsplash.com/photo-1582461833047-2aeb4f8af173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'essential-ingredients': {
    title: 'Essential Ingredients',
    description: 'Recipes featuring fresh, seasonal produce.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1160&auto=format&fit=crop'
  },
  'main-dishes': {
    title: 'Main Dishes',
    description: 'Easy recipes for meal prepping and planning.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1160&auto=format&fit=crop'
  }
};


const getRecipesByCategory = (slug: string) => {
  const allRecipes = [

    {
      id: 1,
      name: 'Quinoa Salad',
      category: 'healthy-foods',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop',
      time: '20 mins',
      rating: 4.5,
      title: 'Quinoa Salad',
      description: 'A healthy and refreshing quinoa salad.',
      servings: 2,
      difficulty: 'Easy'
    },
    {
      id: 2,
      name: 'Avocado Toast',
      category: 'healthy-foods',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1074&auto=format&fit=crop',
      time: '10 mins',
      rating: 4.2,
      title: 'Avocado Toast',
      description: 'A quick and nutritious avocado toast.',
      servings: 1,
      difficulty: 'Easy'
    },

    {
      id: 3,
      name: 'Chocolate Cake',
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1565800080246-8a1b718d0ba8?q=80&w=1170&auto=format&fit=crop',
      time: '60 mins',
      rating: 4.8,
      title: 'Chocolate Cake',
      description: 'A rich and moist chocolate cake.',
      servings: 8,
      difficulty: 'Medium'
    },

    {
      id: 4,
      name: 'Tomato Basil Salad',
      category: 'essential-ingredients',
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=1171&auto=format&fit=crop',
      time: '15 mins',
      rating: 4.3,
      title: 'Tomato Basil Salad',
      description: 'A fresh and flavorful tomato basil salad.',
      servings: 4,
      difficulty: 'Easy'
    },

    {
      id: 5,
      name: 'Grilled Salmon',
      category: 'main-dishes',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1170&auto=format&fit=crop',
      time: '25 mins',
      rating: 4.7,
      title: 'Grilled Salmon',
      description: 'A perfectly grilled salmon fillet.',
      servings: 2,
      difficulty: 'Medium'
    }
  ];

  return allRecipes.filter(recipe => recipe.category === slug);
};

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <div>Category not found</div>;
  }

  const category = categoryMap[slug as keyof typeof categoryMap] || {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: "Explore our collection of recipes.",
    image: "https://plus.unsplash.com/premium_photo-1723118424218-54c1de8140c7?q=80&w=2153&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const categoryRecipes = getRecipesByCategory(slug);

  return (
    <div className="bg-[#fffaf5] min-h-screen">
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover brightness-[0.7]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="container">
            <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl">{category.title} Recipes</h1>
            <p className="max-w-2xl text-lg text-white/80">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 md:px-6">
        <div className="mb-6">
          <Link
            to="/categories"
            className="inline-flex items-center text-sm font-medium text-[#e63946] hover:underline focus:outline-none focus:underline"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to All Categories
          </Link>
        </div>

        <div className="flex flex-col space-y-6">
          <p className="text-[#6b6b6b]">Showing {categoryRecipes.length} recipes</p>

          {categoryRecipes.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[#6b6b6b]">No recipes found in this category.</p>
              <Link 
                to="/categories" 
                className="mt-4 inline-block px-4 py-2 bg-[#e63946] text-white rounded-md hover:bg-[#d62c3a]"
              >
                Browse Other Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 

                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;