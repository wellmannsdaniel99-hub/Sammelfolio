import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

type PriceEntry = { price: number; date: string; source: 'manual' };
type PriceHistory = Record<string, PriceEntry[]>;
type SealedPriceContextValue = {
  history: PriceHistory;
  setPrice: (productId: string, price: number) => void;
  latestPrice: (productId: string, fallback: number) => number;
};

const STORAGE_KEY = '@sammelfolio/sealed-prices-v1';
const SealedPriceContext = createContext<SealedPriceContextValue | null>(null);

export function SealedPriceProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<PriceHistory>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(raw => { if (raw) setHistory(JSON.parse(raw)); })
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history)).catch(() => {});
  }, [history, hydrated]);

  const setPrice = (productId: string, price: number) => {
    const entry: PriceEntry = { price, date: new Date().toISOString(), source: 'manual' };
    setHistory(current => ({ ...current, [productId]: [...(current[productId] ?? []), entry] }));
  };

  const latestPrice = (productId: string, fallback: number) => {
    const entries = history[productId];
    return entries?.length ? entries[entries.length - 1].price : fallback;
  };

  const value = useMemo(() => ({ history, setPrice, latestPrice }), [history]);
  return <SealedPriceContext.Provider value={value}>{children}</SealedPriceContext.Provider>;
}

export function useSealedPrices() {
  const context = useContext(SealedPriceContext);
  if (!context) throw new Error('useSealedPrices must be used inside SealedPriceProvider');
  return context;
}
