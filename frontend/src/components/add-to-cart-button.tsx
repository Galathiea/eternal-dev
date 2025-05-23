// filepath: c:\Users\User\Downloads\SchoolSHIY\DESIGN\KITCHEN KITCHEN\Kitchen\src\components\add-to-cart-button.tsx
import * as React from "react";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productName,
  quantity,
}) => {
  const handleAddToCart = () => {
    // Implement add to cart functionality here
    console.log(`Added ${quantity} of ${productName} to cart.`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-[#e63946] hover:bg-[#d62b39] text-white py-2 px-4 rounded-md"
    >
      Add to Cart
    </button>
  );
};