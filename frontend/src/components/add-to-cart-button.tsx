import * as React from "react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  image: string;
  quantity?: number;
  time?: string;
  servings?: string;
  className?: string;
  disabled?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  productName,
  price,
  image,
  quantity = 1,
  time,
  servings,
  className = "",
  disabled = false,
}) => {
  const { addToCart, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    if (disabled || isAdding) return;
    
    setIsAdding(true);
    try {
      await addToCart({
        id: productId,
        name: productName,
        price,
        quantity,
        image,
        time,
        servings
      });
      
      console.log(`Added ${quantity} ${productName} to cart`);
      
      // Show success feedback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Could add toast notification here for error
    } finally {
      setIsAdding(false);
    }
  };

  const getButtonText = () => {
    if (isAdding) return "Adding...";
    if (showSuccess) return "Added!";
    return "Add to Cart";
  };

  const getButtonClass = () => {
    const baseClass = "w-full py-2 px-4 rounded-md transition-all duration-200 font-medium";
    const customClass = className || "";
    
    if (disabled || isAdding) {
      return `${baseClass} ${customClass} bg-gray-400 text-gray-600 cursor-not-allowed`;
    }
    
    if (showSuccess) {
      return `${baseClass} ${customClass} bg-green-600 hover:bg-green-700 text-white`;
    }
    
    return `${baseClass} ${customClass} bg-[#e63946] hover:bg-[#d62b39] text-white`;
  };

  return (
    <div className="relative">
      <button
        onClick={handleAddToCart}
        disabled={disabled || isAdding}
        className={getButtonClass()}
        aria-label={`Add ${productName} to cart`}
      >
        <div className="flex items-center justify-center gap-2">
          {isAdding && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {showSuccess && (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          <span>{getButtonText()}</span>
        </div>
      </button>
      
      {!isAuthenticated && (
        <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-500 text-center">
          Sign in to sync cart
        </div>
      )}
    </div>
  );
};