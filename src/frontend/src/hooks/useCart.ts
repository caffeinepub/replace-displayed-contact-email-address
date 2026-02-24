import { useState, useEffect } from 'react';
import { ShoppingItem } from '../backend';

interface CartItem {
  productId: string;
  productName: string;
  productDescription: string;
  priceInCents: bigint;
  quantity: number;
  currency: string;
  imageUrl?: string;
}

const CART_STORAGE_KEY = 'pc_computer_cart';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert priceInCents back to BigInt
        return parsed.map((item: any) => ({
          ...item,
          priceInCents: BigInt(item.priceInCents),
        }));
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
    }
    return [];
  });

  useEffect(() => {
    try {
      // Convert BigInt to string for storage
      const toStore = cartItems.map((item) => ({
        ...item,
        priceInCents: item.priceInCents.toString(),
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(toStore));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.priceInCents) * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getShoppingItems = (): ShoppingItem[] => {
    return cartItems.map((item) => ({
      productName: item.productName,
      productDescription: item.productDescription,
      priceInCents: item.priceInCents,
      quantity: BigInt(item.quantity),
      currency: item.currency,
    }));
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getShoppingItems,
  };
}
