export type TCGdexCardBrief = {
  id: string;
  localId: string;
  name: string;
  image?: string;
};

export type TCGdexCard = TCGdexCardBrief & {
  rarity?: string;
  set?: { id: string; name: string };
  pricing?: {
    cardmarket?: {
      updated?: string;
      unit?: string;
      avg?: number;
      low?: number;
      trend?: number;
      avg1?: number;
      avg7?: number;
      avg30?: number;
      'trend-holo'?: number;
    };
  };
};

const BASE_URL = 'https://api.tcgdex.net/v2/de';

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`TCGdex HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

export async function searchGermanCards(query: string): Promise<TCGdexCardBrief[]> {
  const value = query.trim();
  if (value.length < 2) return [];
  const url = `${BASE_URL}/cards?name=${encodeURIComponent(value)}`;
  const cards = await getJson<TCGdexCardBrief[]>(url);
  return cards.slice(0, 30);
}

export async function getGermanCard(id: string): Promise<TCGdexCard> {
  return getJson<TCGdexCard>(`${BASE_URL}/cards/${encodeURIComponent(id)}`);
}

export function cardmarketValue(card: TCGdexCard): number | undefined {
  const prices = card.pricing?.cardmarket;
  return prices?.trend ?? prices?.avg7 ?? prices?.avg30 ?? prices?.avg ?? prices?.low;
}

export function cardImage(image?: string, quality: 'low' | 'high' = 'low'): string | undefined {
  if (!image) return undefined;
  return `${image}/${quality}.webp`;
}
