import { CardType } from '~/types/card';

export const getColorByType = (type: CardType): string | undefined => ({
  [CardType.Adversary]: 'green-darken-2',
  [CardType.Agent]: 'white',
  [CardType.Bluff]: 'grey-darken-1',
  [CardType.Combat]: 'red-darken-4',
  [CardType.Equipment]: 'light-blue-darken-3',
  [CardType.Event]: 'pink-darken-2',
  [CardType.Site]: 'blue-darken-4',
  [CardType.Witness]: 'purple-darken-1',
  [CardType.XFile]: 'yellow',
  [CardType.Credits]: 'orange-darken-2',
}[type]);
