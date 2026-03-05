import {
  type Card,
  CardSet
} from '~/types/card';
import { slugify } from '~/utils/slugify';

export const usePool = async (...sets: CardSet[]): Promise<Card[]> => {
  const imports = await Promise.all((sets.length > 0 ? sets : Object.values(CardSet)).map(async (set) => {
    const filename = slugify(set);

    const module = await import(`~/assets/cards/${filename}.json`);

    return module.default as Card[];
  }));

  return imports.flat();
};
