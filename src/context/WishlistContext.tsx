import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, WishlistItem } from '@/types';
import { toast } from 'sonner';

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        toast.info('Already in wishlist');
        return prev;
      }
      toast.success('Added to wishlist');
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (id: string) => items.some(item => item.id === id);

  const clearWishlist = () => {
    setItems([]);
    toast.success('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
