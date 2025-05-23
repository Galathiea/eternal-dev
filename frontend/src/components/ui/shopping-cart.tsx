import { Button } from "@/components/ui/button";

interface ShoppingCartProps {
  items: { name: string; price: string; quantity: number }[];
}

export const ShoppingCart = ({ items }: ShoppingCartProps) => {
  const subtotal = items.reduce((total, item) => total + parseFloat(item.price.replace("$", "")) * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-xl font-bold">Your Shopping Cart</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">{item.price}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-gray-700">-</button>
              <span>{item.quantity}</span>
              <button className="text-gray-500 hover:text-gray-700">+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-4 text-xl font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <Button variant="default" className="w-full mt-6">
        Proceed to Checkout
      </Button>
    </div>
  );
};