import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

interface Recipe {
  id: string; // Changed to string to match CartContext
  title: string;
  image: string;
  description: string;
  rating: number;
  time: string;
  servings: number;
  category: string;
  difficulty: string;
  price: number;
}

interface RecipeCardReProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardReProps> = ({ recipe }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find(item => item.id === String(recipe.id));
  const quantity = cartItem?.quantity || 0;

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (quantity === 0) {
      addToCart({
        id: String(recipe.id),
        name: recipe.title,
        price: recipe.price,
        quantity: 1,
        image: recipe.image,
        time: recipe.time,
        servings: recipe.servings.toString(),
      });
    } else {
      updateQuantity(String(recipe.id), quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (quantity > 0) {
      updateQuantity(String(recipe.id), quantity - 1);
    }
  };

  return (
    <Link to={`/recipes/${recipe.id}`}>
      <div className="relative overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="object-cover w-full h-48"
        />
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold">{recipe.title}</h3>
          <p className="mb-3 text-sm text-gray-600">{recipe.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>⭐ {recipe.rating}</span>
            <span>⏱ {recipe.time}</span>
            <span>🍽 {recipe.servings}</span>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span className="px-2 py-1 bg-gray-100 rounded">{recipe.category}</span>
            <span className="px-2 py-1 bg-gray-100 rounded">{recipe.difficulty}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecrement}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700"
                  disabled={quantity <= 0}
                >
                  <FaMinus />
                </button>
                <span className="px-2 py-1 bg-gray-100 rounded text-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="text-sm text-gray-700">
                <div>Price: ₱{recipe.price.toFixed(2)}</div>
                {quantity > 0 && (
                  <div className="font-semibold">Total: ₱{(recipe.price * quantity).toFixed(2)}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;