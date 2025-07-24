import type { Sortable } from '~/types/sort';
import type { Filterable } from '~/types/filter';
import type {
  CardRarity,
  CardSet,
  CardType,
} from '~/utils/card';

export type CardId = string;

type CharacteristicName = 'Affiliation' | 'Motive' | 'Method' | 'Result';

type BasicSkillName = 'Long Range Combat' | 'Close Range Combat' | 'Health' | 'Resources';
type InvestigationSkillName = 'Alien Investigation' | 'Behavioral' | 'Bureaucracy'
  | 'Computer' | 'Criminal Investigation' | 'Evidence Collection'
  | 'Medical' | 'Observation' | 'Occult Investigation'
  | 'Sciences' | 'Subterfuge';

export interface Card extends Sortable, Filterable {
  id: CardId;
  title: string;
  set: CardSet;
  rarity: CardRarity;
  episode: string;
  type: CardType;
  cost: string;
  prerequisite: string;
  question: string;
  keywords: string[];
  skills: Record<BasicSkillName | InvestigationSkillName, number | 'N/A' | 'Special'>;
  characteristics: Record<CharacteristicName, string>;
  activators: string[];
  gameEffect: string;
  bio: string;
  dialogue: string;
  foundIn: string;
  tags: string[];
  createdBy: string;
}