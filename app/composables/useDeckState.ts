import type { Deck } from '~/types/deck';

const defaultValue = (): Deck => ({
  id: crypto.randomUUID(),
  title: '__new__',
  card_ids: {},
  created_at: new Date().toUTCString(),
  created_by: '__anonymous__',
  likes: 0,
  public: false,
  profile_id: crypto.randomUUID(),
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
