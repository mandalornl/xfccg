import type { CardId } from '~/types/card';

export interface Deck {
  id: string;
  title: string;
  card_ids: Record<CardId, number>;
  public: boolean;
  created_at: string;
  user_id: string;
  tags: string[];
}

export interface Decklist extends Deck {
  created_by?: string;
  likes?: number;
  liked?: boolean;
}
