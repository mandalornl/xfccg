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
  tags: string[];
}

// export interface Deck {
//   id: null | string;
//   title: null | string;
//   card_ids: Record<CardId, number>;
//   public: boolean;
//   created_at: null | string;
//   user_id: null | string;
//   tags: string[];
// }
//
// export interface Decklist extends Deck {
//   created_by: null | string;
//   likes: number;
//   liked: boolean;
// }

export interface CardInDeck extends Card {
  quantity: number;
}
