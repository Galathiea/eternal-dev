import { useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

/**
 * Hook to handle cart synchronization between local storage and API
 * Automatically syncs cart when user logs in/out
 */
export const useCartSync = () => {
  const { cartItems, refreshCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  // Sync cart when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      // User logged in - sync local cart with server
      refreshCart();
    } else {
      // User logged out - clear any sensitive cart data
      // Note: We keep local cart for offline functionality
      console.log('User logged out, maintaining local cart');
    }
  }, [isAuthenticated, refreshCart]);

  // Backup cart to localStorage periodically
  useEffect(() => {
    const backupInterval = setInterval(() => {
      if (cartItems.length > 0) {
        localStorage.setItem('cart_backup', JSON.stringify({
          items: cartItems,
          timestamp: Date.now(),
          user: user?.id || null
        }));
      }
    }, 30000); // Backup every 30 seconds

    return () => clearInterval(backupInterval);
  }, [cartItems, user]);

  const syncWithServer = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await refreshCart();
      } catch (error) {
        console.error('Failed to sync cart with server:', error);
      }
    }
  }, [isAuthenticated, refreshCart]);

  const restoreFromBackup = useCallback(() => {
    try {
      const backup = localStorage.getItem('cart_backup');
      if (backup) {
        const parsedBackup = JSON.parse(backup);
        const hourAgo = Date.now() - (60 * 60 * 1000);
        
        // Only restore if backup is less than 1 hour old
        if (parsedBackup.timestamp > hourAgo) {
          return parsedBackup.items;
        }
      }
    } catch (error) {
      console.error('Failed to restore cart from backup:', error);
    }
    return null;
  }, []);

  return {
    syncWithServer,
    restoreFromBackup,
  };
};