export interface Category {
    title: string;
    description: string;
    image: string;
  }
  
  export interface Recipe {
    title: string;
    image: string;
    description: string;
    rating: number;
    time: string;
    servings: number;
    category: string;
    difficulty: string;
  }
  
  export const categoryMap: Record<string, Category> = {
    "healthy-foods": {
      title: "Healthy Foods",
      description: "Nutritious and delicious recipes that promote wellness and a balanced diet.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=870&auto=format&fit=crop",
    },
    desserts: {
      title: "Desserts",
      description: "Indulge in sweet treats with our collection of delectable dessert recipes for any occasion.",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=864&auto=format&fit=crop",
    },
    "essential-ingredients": {
      title: "Essential Ingredients",
      description: "Discover recipes featuring staple ingredients that are versatile and foundational to great cooking.",
      image: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?q=80&w=1170&auto=format&fit=crop",
    },
    "main-dishes": {
      title: "Main Dishes",
      description: "Hearty and delicious main course recipes to satisfy your hunger and impress your guests.",
      image: "https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=1033&auto=format&fit=crop",
    },
  };
  
  export const getRecipesByCategory = (slug: string): Recipe[] => {
    const allRecipes: (Recipe | false)[] = [
      slug === "healthy-foods" && {
        title: "Mediterranean Salad",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=884&auto=format&fit=crop",
        description: "Fresh vegetables, olives, feta cheese, and a zesty lemon dressing.",
        rating: 4.5,
        time: "15 min",
        servings: 2,
        category: "Healthy Foods",
        difficulty: "Easy",
      },
      // ... (include all other recipes from your original code)
    ];
  
    return allRecipes.filter(Boolean) as Recipe[];
  };