// src/hooks/useFetchProduct.ts
import { ReactNode, useEffect, useState } from 'react';

interface Product {
  comments: undefined;
  reviews: boolean;
  nutrition: any;
  dietInfo: any;
  rating: any;
  title: ReactNode;
  id: string;
  name: string;
  price: number;
  description: string;
}

export const useFetchProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};