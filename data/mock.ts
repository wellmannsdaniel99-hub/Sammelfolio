export type CollectionItem = {
  id: string;
  name: string;
  subtitle: string;
  kind: 'Karte' | 'Sealed';
  quantity: number;
  buyPrice: number;
  marketPrice: number;
  productType?: 'Top-Trainer-Box' | 'Booster Bundle' | 'Display' | 'Sonstiges';
  setName?: string;
  language?: 'DE';
};

export const collection: CollectionItem[] = [
  { id: 'mew-199', name: 'Glurak ex', subtitle: '199/165 · 151 · DE · NM', kind: 'Karte', quantity: 1, buyPrice: 220, marketPrice: 315, language: 'DE' },
  { id: '151-bundle', name: '151 Booster Bundle', subtitle: '151 · Deutsch · Sealed', kind: 'Sealed', quantity: 4, buyPrice: 59.99, marketPrice: 139.5, productType: 'Booster Bundle', setName: '151', language: 'DE' },
  { id: 'mew-200', name: 'Turtok ex', subtitle: '200/165 · 151 · DE · NM', kind: 'Karte', quantity: 1, buyPrice: 105, marketPrice: 169, language: 'DE' },
];

export const topTrainerBoxes: CollectionItem[] = [
  { id: 'etb-151-de', name: '151 Top-Trainer-Box', subtitle: '151 · Deutsch · Top-Trainer-Box', kind: 'Sealed', quantity: 1, buyPrice: 54.99, marketPrice: 84.9, productType: 'Top-Trainer-Box', setName: '151', language: 'DE' },
  { id: 'etb-obsidianflammen-de', name: 'Obsidianflammen Top-Trainer-Box', subtitle: 'Obsidianflammen · Deutsch · Top-Trainer-Box', kind: 'Sealed', quantity: 1, buyPrice: 49.99, marketPrice: 59.9, productType: 'Top-Trainer-Box', setName: 'Obsidianflammen', language: 'DE' },
  { id: 'etb-paradoxrift-de', name: 'Paradoxrift Top-Trainer-Box', subtitle: 'Paradoxrift · Deutsch · Top-Trainer-Box', kind: 'Sealed', quantity: 1, buyPrice: 49.99, marketPrice: 57.9, productType: 'Top-Trainer-Box', setName: 'Paradoxrift', language: 'DE' },
  { id: 'etb-paldeas-schicksale-de', name: 'Paldeas Schicksale Top-Trainer-Box', subtitle: 'Paldeas Schicksale · Deutsch · Top-Trainer-Box', kind: 'Sealed', quantity: 1, buyPrice: 54.99, marketPrice: 74.9, productType: 'Top-Trainer-Box', setName: 'Paldeas Schicksale', language: 'DE' },
  { id: 'etb-maskerade-de', name: 'Maskerade im Zwielicht Top-Trainer-Box', subtitle: 'Maskerade im Zwielicht · Deutsch · Top-Trainer-Box', kind: 'Sealed', quantity: 1, buyPrice: 49.99, marketPrice: 54.9, productType: 'Top-Trainer-Box', setName: 'Maskerade im Zwielicht', language: 'DE' },
  { id: 'etb-stellarkrone-de', name: 'Stellarkrone Top-Trainer-Box', subtitle: 'Stellarkrone · Deutsch · Top-Trainer-Box', kind: 'Sealed', quantity: 1, buyPrice: 49.99, marketPrice: 54.9, productType: 'Top-Trainer-Box', setName: 'Stellarkrone', language: 'DE' },
  { id: 'etb-prismatische-entwicklungen-de', name: 'Prismatische Entwicklungen Top-Trainer-Box', subtitle: 'Prismatische Entwicklungen · Deutsch · Top-Trainer-Box', kind: 'Sealed', quantity: 1, buyPrice: 59.99, marketPrice: 94.9, productType: 'Top-Trainer-Box', setName: 'Prismatische Entwicklungen', language: 'DE' },
  { id: 'etb-reisegefaehrten-de', name: 'Reisegefährten Top-Trainer-Box', subtitle: 'Reisegefährten · Deutsch · Top-Trainer-Box', kind: 'Sealed', quantity: 1, buyPrice: 54.99, marketPrice: 69.9, productType: 'Top-Trainer-Box', setName: 'Reisegefährten', language: 'DE' },
];

export const discoveries: CollectionItem[] = [
  ...collection,
  ...topTrainerBoxes,
];

export const euro = (value: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
