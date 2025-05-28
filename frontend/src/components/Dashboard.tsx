import { useState, useEffect } from 'react';
import { api, endpoints } from '../utils/api';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import Cart from './Cart';
import RecipeForm from './RecipeForm';
import { useNavigate } from 'react-router-dom';

interface Recipe {
  id: number;
  title: string;
  description: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  price: number;
  image_url: string | null;
  category: {
    id: number;
    name: string;
  };
}

export default function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (!token) {
      navigate('/login');
    } else {
      fetchRecipes();
    }
  }, [navigate]);

  const fetchRecipes = async () => {
    try {
      const response = await api.get(endpoints.recipes);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setRecipes([]);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6 px-4 py-4">
        <h1 className="text-2xl font-bold">Eternal Haven Kitchen</h1>

        {isLoggedIn && (
          <div className="flex gap-4">
            <Button onClick={handleLogout}>Logout</Button>
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Close Form' : 'Add Recipe'}
            </Button>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <div className="container mx-auto p-4">
          <div className="space-y-6">
            {showForm && (
              <RecipeForm
                recipe={editingRecipe}
                onClose={() => {
                  setShowForm(false);
                  setEditingRecipe(null);
                  fetchRecipes();
                }}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="rounded-lg shadow-md overflow-hidden">
                  <CardHeader className="p-4 bg-white border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-semibold text-gray-800">{recipe.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingRecipe(recipe);
                            setShowForm(true);
                          }}
                          className="text-amber-600 border-amber-600 hover:bg-amber-50"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this recipe?')) {
                              try {
                                await api.delete(`<span class="math-inline">\{endpoints\.recipes\}</span>{recipe.id}/`);
                                fetchRecipes();
                              } catch (error) {
                                console.error('Error deleting recipe:', error);
                              }
                            }
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">{recipe.description}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Prep: {recipe.prep_time} min</span>
                        <span>Cook: {recipe.cook_time} min</span>
                        <span>Servings: {recipe.servings}</span>
                      </div>
                    </div>
                    {recipe.image_url && (
                      <img 
                        src={recipe.image_url} 
                        alt={recipe.title}
                        className="mt-2 w-full h-48 object-cover rounded-md"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/400x200/cccccc/000000?text=No+Image";
                        }}
                      />
                    )}
                    <div>
                      <Cart />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}