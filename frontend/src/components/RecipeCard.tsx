import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

interface Recipe {
  id: number;
  title: string;
  // ⭐ IMPORTANT: 'image' should be 'string | null' or 'string | undefined'
  // if it's possible for a recipe not to have an image, or if the backend sends null.
  image: string | null;
  description: string;
  // ⭐ IMPORTANT: 'rating', 'time', 'difficulty' should be optional if they
  // are not always returned by your Django API or are calculated client-side.
  // Check your Django Recipe Serializer to see what fields are actually returned.
  rating?: number; // Made optional
  time?: string;   // Made optional (consider using prep_time and cook_time from backend)
  servings: number;
  category: string;
  difficulty?: string; // Made optional
  price: number;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  // const navigate = useNavigate(); // You can safely remove this line if it's not used anywhere else
                                   // for programmatic navigation (e.g., after adding to cart, navigate to cart page).
                                   // The <Link> component handles the primary card navigation.

  const cartItem = cartItems.find(item => item.id === recipe.id.toString());
  const quantity = cartItem?.quantity || 0;

  const handleIncrement = (e: React.MouseEvent) => { // Add MouseEvent type for better safety
    e.stopPropagation(); // ⭐ Prevent the Link from triggering when clicking + button
    if (quantity === 0) {
      addToCart({
        id: recipe.id.toString(),
        name: recipe.title,
        price: recipe.price.toString(),
        image: recipe.image ?? "",
        quantity: 1,
      });
    } else {
      updateQuantity(recipe.id.toString(), quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => { // Add MouseEvent type for better safety
    e.stopPropagation(); // ⭐ Prevent the Link from triggering when clicking - button
    if (quantity > 0) {
      updateQuantity(recipe.id.toString(), quantity - 1);
    }
  };

  return (
    // Wrap the entire card with Link for navigation, use 'block' for full clickable area
    <Link to={`/recipes/${recipe.id}`} className="block">
      <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer relative h-full flex flex-col">
        {/* ⭐ Conditional Image Rendering ⭐ */}
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="object-cover w-full h-48 flex-shrink-0" // flex-shrink-0 helps image keep its size
          />
        ) : (
          // Fallback if no image URL is provided by the backend
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Image Available
          </div>
        )}

        <div className="p-4 flex-grow"> {/* flex-grow ensures content pushes the bottom div down */}
          <h3 className="mb-2 text-lg font-semibold">{recipe.title}</h3>
          {/* Truncate description for card view, and handle potential undefined */}
          <p className="mb-3 text-sm text-gray-600">
            {recipe.description && recipe.description.length > 100
              ? `${recipe.description.substring(0, 100)}...`
              : recipe.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            {/* Conditional rendering for optional fields */}
            {recipe.rating !== undefined && <span>⭐ {recipe.rating}</span>}
            {recipe.time !== undefined && <span>⏱ {recipe.time}</span>}
            <span>🍽 {recipe.servings}</span>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            {/* Conditional rendering for optional fields */}
            {recipe.category && <span className="px-2 py-1 bg-gray-100 rounded">{recipe.category}</span>}
            {recipe.difficulty && <span className="px-2 py-1 bg-gray-100 rounded">{recipe.difficulty}</span>}
          </div>
        </div>

        {/* This div should be positioned to stay at the bottom of the card */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecrement} // Direct reference now that e is passed
                className="p-2 rounded-full text-gray-500 hover:text-gray-700"
                disabled={quantity <= 0}
              >
                <FaMinus />
              </button>
              <span className="px-2 py-1 bg-gray-100 rounded text-gray-700">
                {quantity}
              </span>
              <button
                onClick={handleIncrement} // Direct reference now that e is passed
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
    </Link>
  );
};

export default RecipeCard;