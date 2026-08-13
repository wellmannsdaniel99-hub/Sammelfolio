import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

export type WishlistItem = {
  id: string;
  name: string;
  subtitle: string;
  kind: 'Karte' | 'Sealed';
  marketPrice?: number;
};

type WishlistContextValue = {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  has: (id: string) => boolean;
};

const STORAGE_KEY = '@sammelfolio/wishlist-v1';
const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => { if (raw) setItems(JSON.parse(raw)); }).finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() => {});
  }, [items, hydrated]);

  const toggle = (item: WishlistItem) => setItems(current => current.some(entry => entry.id === item.id) ? current.filter(entry => entry.id !== item.id) : [...current, item]);
  const has = (id: string) => items.some(item => item.id === id);
  const value = useMemo(() => ({ items, toggle, has }), [items]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider');
  return context;
}
