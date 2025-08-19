import {
  type Card,
  CardSet
} from '~/types/card';

export const usePool = async (sets: CardSet[] = []): Promise<Card[]> => {
  const imports = await Promise.all((sets.length > 0 ? sets : Object.values(CardSet)).map(async (set) => {
    const filename = set
      .toLowerCase()
      .replaceAll(' ', '-');

    const module = await import(`~/assets/cards/${filename}.json`);

    return module.default as Card[];
  }));

  return imports.flat();
};
