import type {
  BasicSkill,
  InvestigationSkill,
  SkillValue,
} from '~/types/skill';
import type { XFileCharacteristic } from '~/types/x-file';

export enum CardSet {
  Premiere = 'Premiere',
  TheTruthIsOutThere = 'The Truth is Out There',
  BirthdayMulder = '101361',
  BirthdayScully = '22364',
  BelieveTheLie = 'Believe the Lie',
  ResistOrServe = 'Resist or Serve',
  Promo = 'Promo',
  GenCon = 'Gen Con',
  FightTheFuture = 'Fight the Future',
  HereThereBeMonsters = 'Here There Be Monsters',
  IWantToBelieve = 'I Want to Believe',
  MyStruggle = 'My Struggle',
  FireWalkWithMe = 'Fire Walk With Me',
  Classified = 'Classified',
}

export enum CardRarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  UltraRare = 'Ultra-Rare',
  Fixed = 'Fixed',
  Promo = 'Promo',
  GenCon = 'Gen Con',
  PreservationSociety = 'Preservation Society',
  Community = 'Community',
}

export enum CardCostPool {
  Resource = 'RP',
  Conspiracy = 'CP',
  Star = '*P',
}

export enum CardType {
  Adversary = 'Adversary',
  Agent = 'Agent',
  Bluff = 'Bluff',
  Combat = 'Combat',
  Equipment = 'Equipment',
  Event = 'Event',
  Site = 'Site',
  Witness = 'Witness',
  XFile = 'X-File',
  Credits = 'Credits',
}

export type CardId = string;

export interface Card {
  id: CardId;
  title: string;
  set: CardSet;
  rarity: CardRarity;
  episode: string;
  type: CardType;
  cost?: string;
  prerequisite?: string;
  question?: string;
  keywords?: string[];
  skills?: Record<BasicSkill | InvestigationSkill, SkillValue>;
  characteristics?: Record<XFileCharacteristic, string>;
  activators?: string[];
  gameEffect?: string;
  bio?: string;
  dialogue?: string;
  foundIn?: string;
  tags: string[];
  createdBy: string;
}
