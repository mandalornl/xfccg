import { CardType } from '~/types/card';

export const getColorByType = (value: CardType | string): string | undefined => ({
  [CardType.Adversary]: 'green-darken-2',
  [CardType.Agent]: 'white',
  [CardType.Bluff]: 'grey-darken-1',
  [CardType.Combat]: 'red-darken-4',
  [CardType.Equipment]: 'light-blue-darken-2',
  [CardType.Event]: 'pink-darken-2',
  [CardType.Site]: 'blue-darken-4',
  [CardType.Witness]: 'purple-darken-1',
  [CardType.XFile]: 'yellow',
  [CardType.Credits]: 'orange-darken-2',
}[value]);

export const getColorByCost = (value: string): string | undefined => ({
  'resource': 'blue',
  'conspiracy': 'red-darken-4',
  'star': 'deep-purple-lighten-1'
}[value]);

export const getColorBySkillTotal = (value: number): string => {
  if (value >= 7) {
    return 'light-blue-accent-2';
  } else if (value >= 4) {
    return 'green-accent-2';
  } else if (value === 3) {
    return 'orange-accent-2';
  } else if (value === 2) {
    return 'red-accent-2';
  } else if (value === 1) {
    return 'grey-lighten-1';
  } else {
    return 'grey-darken-2';
  }
};
