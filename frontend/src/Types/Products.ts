export interface Product {
    id: string;
    title: string;
    description: string;
    rating: string;
    price: string;
    dietInfo: {
      quantity: string;
      deliveryPrice: string;
    };
    nutrition: {
      calories: number;
      fat: number;
      carbs: number;
      protein: string;
      per: string;
      sugar: string;
    };
    recipeBy: {
      name: string;
      title: string;
    };
    categories: {
      name: string;
      details: string;
    }[];
    menuItems: {
      name: string;
      items: string[];
    }[];
    instructions: string[];
    reviews: {
      author: string;
      comment: string;
    }[];
    comments: number;
  }