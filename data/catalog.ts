import { CollectionItem, discoveries as baseDiscoveries } from './mock';

export const englishStandardEtbs: CollectionItem[] = [
  {
    id: 'etb-ascended-heroes-en',
    name: 'Mega Evolution—Ascended Heroes Elite Trainer Box',
    subtitle: 'Ascended Heroes · Englisch · Elite Trainer Box',
    kind: 'Sealed',
    quantity: 1,
    buyPrice: 0,
    marketPrice: 0,
    productType: 'Top-Trainer-Box',
    setName: 'Ascended Heroes',
    language: 'EN',
  },
];

export const discoveries: CollectionItem[] = Array.from(
  new Map([...baseDiscoveries, ...englishStandardEtbs].map(item => [item.id, item])).values()
);
