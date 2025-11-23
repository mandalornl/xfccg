import type {
  Card,
  CardId,
} from '~/types/card';

export interface Deck {
  id: string;
  title: string;
  card_ids: Record<CardId, number>;
  created_at: string;
  created_by: string;
  likes: number;
  public: boolean;
}

export interface CardInDeck extends Card {
  quantity: number;
}
