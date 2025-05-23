import { useState } from 'react';
import { api, endpoints } from '../utils/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface CartItemProps {
  item: {
    id: number;
    recipe: {
      id: number;
      title: string;
      description: string;
      price: number;
    };
    quantity: number;
  };
  cartId: number;
  onUpdate: () => void;
}

export function CartItem({ item, cartId, onUpdate }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      try {
        setLoading(true);
        await api.patch(`${endpoints.cart}${cartId}/items/${item.id}/`, {
          quantity: newQuantity
        });
        onUpdate();
      } catch (error) {
        console.error('Error updating quantity:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemove = async () => {
    try {
      setLoading(true);
      await api.delete(`${endpoints.cart}${cartId}/items/${item.id}/`);
      onUpdate();
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h3 className="font-semibold">{item.recipe.title}</h3>
        <p className="text-sm text-gray-600">{item.recipe.description}</p>
        <p className="text-sm font-medium">${item.recipe.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span>Qty:</span>
          <Input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-20"
            disabled={loading}
          />
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleRemove}
          disabled={loading}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
