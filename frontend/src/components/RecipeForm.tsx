import React, { useState, useEffect } from 'react';
import { api, endpoints } from '../utils/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

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

interface RecipeFormData {
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

interface RecipeFormProps {
  recipe?: Recipe | null;
  onClose?: () => void;
}

export default function RecipeForm({ recipe, onClose }: RecipeFormProps) {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: recipe?.title || '',
    description: recipe?.description || '',
    prep_time: recipe?.prep_time || 0,
    cook_time: recipe?.cook_time || 0,
    servings: recipe?.servings || 1,
    price: recipe?.price || 0,
    image_url: recipe?.image_url || null,
    category: recipe?.category || { id: 0, name: '' },
  });
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(endpoints.categories);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (name: string, value: string | { id: number; name: string }) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'category' ? (typeof value === 'string' ? JSON.parse(value) : value) : 
               name === 'price' ? parseFloat(value as string) : 
               name === 'servings' ? parseInt(value as string) : 
               name === 'prep_time' ? parseInt(value as string) : 
               name === 'cook_time' ? parseInt(value as string) : 
               value as string
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (recipe) {
        await api.put(`<span class="math-inline">\{endpoints\.recipes\}</span>{recipe.id}/`, {
          title: formData.title,
          description: formData.description,
          prep_time: parseInt(formData.prep_time.toString()),
          cook_time: parseInt(formData.cook_time.toString()),
          servings: parseInt(formData.servings.toString()),
          image_url: formData.image_url || '',
          price: parseFloat(formData.price.toString()),
          category: formData.category
        } as Recipe);
      } else {
        await api.post(`${endpoints.recipes}create/`, {
          title: formData.title,
          description: formData.description,
          prep_time: parseInt(formData.prep_time.toString()),
          cook_time: parseInt(formData.cook_time.toString()),
          servings: parseInt(formData.servings.toString()),
          image_url: formData.image_url || '',
          price: formData.price,
          category: formData.category
        });
      }

      onClose?.();
    } catch (error) {
      setError('Failed to save recipe. Please try again.');
      console.error('Error saving recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          {recipe ? 'Edit Recipe' : 'Add New Recipe'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
                placeholder="Recipe title"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                placeholder="Recipe description"
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prep Time (minutes)</label>
                <Input
                  type="number"
                  name="prep_time"
                  value={formData.prep_time}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  required
                  min="0"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cook Time (minutes)</label>
                <Input
                  type="number"
                  name="cook_time"
                  value={formData.cook_time}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  required
                  min="0"
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Servings</label>
              <Input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
                min="1"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                type="url"
                name="image_url"
                value={formData.image_url || ''}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                placeholder="https://example.com/recipe.jpg"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={JSON.stringify(formData.category)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  try {
                    const selectedCategory = JSON.parse(e.target.value);
                    handleInputChange('category', selectedCategory);
                  } catch (error) {
                    console.error('Error parsing category:', error);
                  }
                }}
                required
                className="w-full p-2 rounded-md border border-input bg-background"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={JSON.stringify(category)}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : recipe ? 'Update Recipe' : 'Add Recipe'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}