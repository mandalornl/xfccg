import type {
  Card,
  CardId,
} from '~/types/card';

export type InDeck = Record<CardId, number>;

export interface Deck {
  id: number;
  name: string;
  card_ids: InDeck;
  created_at: string;
  created_by: string;
  likes: number;
  public: boolean;
}

export interface CardInDeck extends Card {
  quantity: number;
}