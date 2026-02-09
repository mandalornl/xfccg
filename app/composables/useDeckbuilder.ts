import type { Deck } from '~/types/deck';
import type { CardId } from '~/types/card';

export const useDeckbuilder = () => {
  const defaultValue = (): Deck => ({
    id: '',
    title: '',
    description: '',
    card_ids: {},
    created_at: '',
    public: false,
    user_id: '',
    tags: [],
  });

  const state = useState<Deck>('deckbuilder', () => defaultValue());

  const size = computed<number>(() => (
    Object.values(state.value.card_ids).reduce((total, quantity) => total + quantity, 0)
  ));

  const update = (deck: Deck)=> {
    state.value = Object.fromEntries(
      Object.entries(defaultValue()).map(([
        key,
        defaultValue,
      ]) => ([
        key,
        deck?.[key as keyof Deck] ?? defaultValue,
      ]))
    ) as unknown as Deck;
  };

  const clear = () => {
    state.value = defaultValue();
  };

  const clone = (): Deck => ({
    ...state.value,
  });

  const setQuantity = (id: CardId, quantity: number) => {
    if (quantity === 0) {
      delete state.value.card_ids?.[id];
    } else {
      state.value.card_ids[id] = quantity;
    }
  };

  const getQuantity = (id: CardId): number => (
    state.value.card_ids[id] ?? 0
  );

  const hasQuantity = (id: CardId): boolean => getQuantity(id) > 0;

  return {
    state,
    size,
    update,
    clear,
    clone,
    setQuantity,
    getQuantity,
    hasQuantity,
  };
};
