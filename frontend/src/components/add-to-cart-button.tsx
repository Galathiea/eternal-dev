"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { cartStore } from "@/lib/cart-store"

interface AddToCartButtonProps {
  productId: string
  productName: string
  price: number
  image: string
  quantity?: number
}

export function AddToCartButton({ productId, productName, price, image, quantity = 1 }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    setIsAdding(true)

    // Simulate API call to add item to cart
    setTimeout(() => {
      setIsAdding(false)
      setIsAdded(true)

      // Add to cart
      cartStore.addItem({
        id: productId,
        name: productName,
        price,
        image,
        quantity,
      })

      const totalItems = cartStore.getItemCount()

      toast({
        title: "Added to cart",
        description: `${productName} (${quantity}) has been added to your cart. Total items: ${totalItems}`,
      })

      // Reset button state after 2 seconds
      setTimeout(() => {
        setIsAdded(false)
      }, 2000)
    }, 500)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
      className={`w-full ${isAdded ? "bg-green-600 hover:bg-green-700" : "bg-[#e63946] hover:bg-[#d62b39]"} text-white`}
    >
      {isAdding ? (
        <span className="flex items-center">
          <span className="w-4 h-4 mr-2 border-2 border-white rounded-full animate-spin border-t-transparent" />
          Adding...
        </span>
      ) : isAdded ? (
        <span className="flex items-center">
          <Check className="w-4 h-4 mr-2" />
          Added to Cart {quantity > 1 ? `(${quantity})` : ""}
        </span>
      ) : (
        <span className="flex items-center">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart {quantity > 1 ? `(${quantity})` : ""}
        </span>
      )}
    </Button>
  )
}

