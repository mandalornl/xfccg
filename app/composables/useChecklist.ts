import type {
  CardSet,
  CardId,
} from '~/types/card';
import { slugify } from '~/utils/slugify';

export const useChecklist = async (set: CardSet) => {
  const pool = await usePool(set);

  const filename = slugify(set);

  const module = await import(`~/assets/checklist/${filename}.json`);
  const groups: CardId[][] = module.default;

  return groups.map((ids) => ids.map((id) => pool.find((card) => card.id === id)!));
};
