import * as React from "react";
import { useCart } from "../context/CartContext";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  image: string;
  quantity?: number;
  time?: string;
  servings?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  productName,
  price,
  image,
  quantity = 1,
  time,
  servings,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: productName,
      price,
      quantity,
      image,
      time,
      servings
    });
    
    console.log(`Added ${quantity} ${productName} to cart`);
    // Optional: Add toast notification here
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-[#e63946] hover:bg-[#d62b39] text-white py-2 px-4 rounded-md transition-colors duration-200"
    >
      Add to Cart
    </button>
  );
};