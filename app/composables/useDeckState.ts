import type { Deck } from '~/types/deck';

const defaultValue = (): Deck => ({
  id: null,
  title: null,
  card_ids: {},
  created_at: null,
  created_by: null,
  likes: 0,
  public: false,
  user_id: null,
});

export const useDeckState = () => {
  const deckState = useState<Deck>('deck', () => defaultValue());

  const deckSize = computed<number>(() => (
    Object.values(deckState.value.card_ids).reduce((total, quantity) => total + quantity, 0)
  ));

  const clearDeck = () => {
    deckState.value = defaultValue();
  };

  return {
    deckState,
    deckSize,
    clearDeck,
  };
};
