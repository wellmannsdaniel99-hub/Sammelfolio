import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { CollectionItem, collection as seedCollection } from '../data/mock';

const STORAGE_KEY = '@sammelfolio/collection-v1';

type AddInput = {
  item: CollectionItem;
  quantity: number;
  buyPrice: number;
  condition?: string;
  purchaseDate?: string;
  notes?: string;
  photoUri?: string;
};

type CollectionContextValue = {
  items: CollectionItem[];
  addItem: (input: AddInput) => void;
  removeItem: (id: string) => void;
  isHydrated: boolean;
};

const CollectionContext = createContext<CollectionContextValue | null>(null);

export function CollectionProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CollectionItem[]>(seedCollection);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then(raw => {
        if (!mounted) return;
        if (raw) setItems(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => { if (mounted) setIsHydrated(true); });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() => {});
  }, [items, isHydrated]);

  const addItem = ({ item, quantity, buyPrice, condition, purchaseDate, notes, photoUri }: AddInput) => {
    setItems(current => {
      const existing = current.find(entry => entry.id === item.id);
      const subtitle = condition && item.kind === 'Karte'
        ? `${item.subtitle.split(' · ').slice(0, 3).join(' · ')} · ${condition}`
        : item.subtitle;

      if (existing) {
        const totalQty = existing.quantity + quantity;
        const weightedBuy = ((existing.buyPrice * existing.quantity) + (buyPrice * quantity)) / totalQty;
        return current.map(entry => entry.id === item.id ? {
          ...entry,
          quantity: totalQty,
          buyPrice: weightedBuy,
          subtitle,
          purchaseDate: purchaseDate || entry.purchaseDate,
          notes: notes || entry.notes,
          photoUri: photoUri || entry.photoUri,
        } : entry);
      }

      return [...current, { ...item, quantity, buyPrice, subtitle, purchaseDate, notes, photoUri }];
    });
  };

  const removeItem = (id: string) => setItems(current => current.filter(entry => entry.id !== id));

  const value = useMemo(() => ({ items, addItem, removeItem, isHydrated }), [items, isHydrated]);
  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) throw new Error('useCollection must be used inside CollectionProvider');
  return context;
}
