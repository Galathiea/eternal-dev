import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

interface Recipe {
  id: number;
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

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const cartItem = cartItems.find(item => item.id === recipe.id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrement = () => {
    if (quantity === 0) {
      addToCart(recipe);
    } else {
      updateQuantity(recipe.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(recipe.id, quantity - 1);
    }
  };

  return (
    <Link to={`/recipes/${recipe.id}`}>
      <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecrement();
                  }}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700"
                  disabled={quantity <= 0}
                >
                  <FaMinus />
                </button>
                <span className="px-2 py-1 bg-gray-100 rounded text-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncrement();
                  }}
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