import type { CardId } from '~/types/card';

export type InDeck = Record<CardId, number>;

export interface Deck {
  id: number;
  name: string;
  card_ids: InDeck;
  created_at: string;
  likes: number;
  public: boolean;
  profile: {
    full_name: string;
  };
}