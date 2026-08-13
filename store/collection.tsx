import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { CollectionItem, collection as seedCollection } from '../data/mock';

type AddInput = {
  item: CollectionItem;
  quantity: number;
  buyPrice: number;
  condition?: string;
};

type CollectionContextValue = {
  items: CollectionItem[];
  addItem: (input: AddInput) => void;
};

const CollectionContext = createContext<CollectionContextValue | null>(null);

export function CollectionProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CollectionItem[]>(seedCollection);

  const addItem = ({ item, quantity, buyPrice, condition }: AddInput) => {
    setItems(current => {
      const existing = current.find(entry => entry.id === item.id);
      const subtitle = condition && item.kind === 'Karte' ? `${item.subtitle.split(' · ').slice(0, 3).join(' · ')} · ${condition}` : item.subtitle;
      if (existing) {
        const totalQty = existing.quantity + quantity;
        const weightedBuy = ((existing.buyPrice * existing.quantity) + (buyPrice * quantity)) / totalQty;
        return current.map(entry => entry.id === item.id ? { ...entry, quantity: totalQty, buyPrice: weightedBuy, subtitle } : entry);
      }
      return [...current, { ...item, quantity, buyPrice, subtitle }];
    });
  };

  const value = useMemo(() => ({ items, addItem }), [items]);
  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) throw new Error('useCollection must be used inside CollectionProvider');
  return context;
}
