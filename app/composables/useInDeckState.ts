import type { CardId } from '~/types/card';

export const useInDeckState = () => (
  useState<Record<CardId, number>>('inDeck', () => ({}))
);