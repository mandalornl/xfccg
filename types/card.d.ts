import type { Sortable } from '~/types/sort';

export interface Card extends Sortable {
  id: string;
  title: string;
  set: string;
  rarity: string;
  episode: string;
  type: string;
  cost: string;
  prerequisite: string;
  question: string;
  keywords: string[];
  skills: { [skillName: string]: number };
  characteristics: { [characteristicName: string]: string };
  activators: string[];
  gameText: string;
  gameEffect: string;
  bio: string;
  dialogue: string;
  foundIn: string;
  tags: string[];
  createdBy: string;
}