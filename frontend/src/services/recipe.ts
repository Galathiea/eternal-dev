import { api } from '../config/api';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  servings: number;
  calories: number;
  category: string;
  difficulty: string;
  rating: number;
  image: string;
  image_url?: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  reviews: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  price: number;
}

export const recipeService = {
  getRecipe: async (id: number): Promise<Recipe> => {
    const response = await api.get(`/api/recipes/${id}/`);
    return response.data;
  },
};
