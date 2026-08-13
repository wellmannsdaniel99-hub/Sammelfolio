export type CollectionItem = {
  id: string;
  name: string;
  subtitle: string;
  kind: 'Karte' | 'Sealed';
  quantity: number;
  buyPrice: number;
  marketPrice: number;
};

export const collection: CollectionItem[] = [
  { id: 'mew-199', name: 'Glurak ex', subtitle: '199/165 · 151 · DE · NM', kind: 'Karte', quantity: 1, buyPrice: 220, marketPrice: 315 },
  { id: '151-bundle', name: '151 Booster Bundle', subtitle: 'Deutsch · Sealed', kind: 'Sealed', quantity: 4, buyPrice: 59.99, marketPrice: 139.5 },
  { id: 'mew-200', name: 'Turtok ex', subtitle: '200/165 · 151 · DE · NM', kind: 'Karte', quantity: 1, buyPrice: 105, marketPrice: 169 },
];

export const discoveries: CollectionItem[] = [
  ...collection,
  { id: 'mew-198', name: 'Bisaflor ex', subtitle: '198/165 · 151 · DE · NM', kind: 'Karte', quantity: 1, buyPrice: 90, marketPrice: 132 },
  { id: '151-etb', name: '151 Top-Trainer-Box', subtitle: 'Deutsch · Sealed', kind: 'Sealed', quantity: 1, buyPrice: 54.99, marketPrice: 84.9 },
];

export const euro = (value: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
