import type { Deck } from '~/types/deck';

const defaultValue = (): Deck => ({
  id: '',
  title: '',
  card_ids: {},
  created_at: '',
  public: false,
  user_id: '',
  tags: [],
});

export const useDeckState = () => {
  const deckState = useState<Deck>('deck', () => defaultValue());

  const deckSize = computed<number>(() => (
    Object.values(deckState.value.card_ids).reduce((total, quantity) => total + quantity, 0)
  ));

  const setDeck = (deck: Deck)=> {
    deckState.value = Object.fromEntries(
      Object.entries(defaultValue()).map(([
        key,
        defaultValue,
      ]) => ([
        key,
        deck?.[key as keyof Deck] ?? defaultValue,
      ]))
    ) as unknown as Deck;
  }

  const clearDeck = () => {
    deckState.value = defaultValue();
  };

  return {
    deckState,
    deckSize,
    setDeck,
    clearDeck,
  };
};
