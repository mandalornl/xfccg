import type {
  Card,
  CardId,
} from '~/types/card';

export interface Deck {
  id: null | string;
  title: null | string;
  card_ids: Record<CardId, number>;
  created_at: null | string;
  created_by: null | string;
  likes: number;
  public: boolean;
  user_id: null | string;
  liked: boolean;
}

export interface CardInDeck extends Card {
  quantity: number;
}
