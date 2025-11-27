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
  profile_id: null | string;
}

export interface CardInDeck extends Card {
  quantity: number;
}
