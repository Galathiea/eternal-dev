import { Product } from '../Types/Products';

export const products: Product[] = [
  {
    id: "1",
    title: "Creamy Garlic Pasta",
    description: "A rich and creamy pasta dish with natural garlic, garnecate chicken, and fresh herbs.",
    rating: "4.0 (C) methanol",
    price: "$14.99",
    dietInfo: {
      quantity: "1",
      deliveryPrice: "$15"
    },
    nutrition: {
      calories: 400,
      fat: 225,
      carbs: 20,
      protein: "10g",
      per: "2g",
      sugar: "3g"
    },
    recipeBy: {
      name: "Clear Water",
      title: "Professional Diet"
    },
    categories: [
      { name: "Fresh", details: "Inlets: 2" },
      { name: "Silence", details: "Quick Meals: 2" }
    ],
    menuItems: [
      { 
        name: "Pizza",
        items: ["Vegetables: 1", "Capsules: 1", "Fruits: 1"]
      }
    ],
    instructions: [
      "Bring a large part of cooked water for a bowl...",
      "With pasta in complete oven-fasting...",
      "Reduce herbs to medium heat...",
      // Add all other steps
    ],
    reviews: [
      {
        author: "Join Aroma",
        comment: "Reasons to gather Aroma?..."
      },
      // Add other reviews
    ],
    comments: 3
  }
];