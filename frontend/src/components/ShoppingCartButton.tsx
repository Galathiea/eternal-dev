"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

// Cart store interface
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

// Simple cart store
const cartStore = {
  items: [] as CartItem[],
  listeners: new Set<() => void>(),

  getItems() {
    return [...this.items]
  },

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0)
  },

  addItem(item: Omit<CartItem, "quantity"> & { quantity?: number }) {
    const quantity = item.quantity || 1
    const existingItemIndex = this.items.findIndex((i) => i.id === item.id)

    if (existingItemIndex >= 0) {
      this.items[existingItemIndex].quantity += quantity
    } else {
      this.items.push({
        ...item,
        quantity,
      })
    }

    this.notifyListeners()
  },

  updateQuantity(id: string, change: number) {
    const itemIndex = this.items.findIndex((item) => item.id === id)
    if (itemIndex >= 0) {
      const newQuantity = this.items[itemIndex].quantity + change
      if (newQuantity <= 0) {
        this.removeItem(id)
      } else {
        this.items[itemIndex].quantity = newQuantity
        this.notifyListeners()
      }
    }
  },

  removeItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id)
    this.notifyListeners()
  },

  clearCart() {
    this.items = []
    this.notifyListeners()
  },

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  },

  notifyListeners() {
    this.listeners.forEach((listener) => listener())
  },
}

export default function ShoppingCartButton() {
  const [cartItems, setCartItems] = useState(cartStore.getItems())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = cartStore.subscribe(() => {
      setCartItems(cartStore.getItems());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const updateQuantity = (id: string, change: number) => {
    cartStore.updateQuantity(id, change);
  };

  const removeItem = (id: string) => {
    cartStore.removeItem(id);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <div className="relative" role="complementary">
      <Button
        variant="outline" 
        size="icon"
        className="relative border-amber-200 hover:bg-amber-50 hover:text-amber-800"
        aria-label={`Shopping Cart with ${totalItems} items`}
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <Badge
            className="absolute -top-2 -right-2 px-2 py-1 bg-amber-600 text-white font-bold min-w-[20px] h-5 flex items-center justify-center"
            aria-hidden="true"
          >
            {totalItems}
          </Badge>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="relative bg-white w-full sm:max-w-md h-[90vh] overflow-auto rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center text-lg font-bold">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Your Shopping Cart
              {totalItems > 0 && (
                <Badge className="ml-2 bg-amber-600">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </Badge>
              )}
            </h2>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[40vh] space-y-4">
              <ShoppingCart className="w-16 h-16 text-amber-200" />
              <h3 className="text-lg font-medium text-gray-800">Your cart is empty</h3>
              <p className="text-center text-gray-500">Looks like you haven't added any items to your cart yet.</p>
              <Button className="text-white bg-amber-600 hover:bg-amber-700" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 my-6 max-h-[50vh] overflow-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-2">
                    <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="font-medium text-amber-800">${item.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border rounded-md border-amber-200">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 p-0 hover:bg-amber-50 hover:text-amber-800"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center" aria-label={`Quantity: ${item.quantity}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 p-0 hover:bg-amber-50 hover:text-amber-800"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 p-0 hover:bg-amber-50 hover:text-amber-800"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-gray-800">${shipping.toFixed(2)}</span>
                </div>
                <hr className="border-amber-200" />
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Total</span>
                  <span className="font-bold text-amber-800">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Link to="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full text-white bg-amber-600 hover:bg-amber-700">Proceed to Checkout</Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-amber-200 hover:bg-amber-50 hover:text-amber-800"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
