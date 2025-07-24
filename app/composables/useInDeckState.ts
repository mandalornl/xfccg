import type { InDeck } from '~/types/deck';

export const useInDeckState = () => (
  useState<InDeck>('inDeck', () => ({}))
);