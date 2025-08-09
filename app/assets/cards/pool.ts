import premiere from '~/assets/cards/premiere.json';
import theTruthIsOutThere from '~/assets/cards/the-truth-is-out-there.json';
import mulder from '~/assets/cards/101361.json';
import scully from '~/assets/cards/22364.json';
import believeTheLie from '~/assets/cards/believe-the-lie.json';
import promo from '~/assets/cards/promo.json';
import gencon from '~/assets/cards/gencon.json';
import fightTheFuture from '~/assets/cards/fight-the-future.json';
import hereThereBeMonsters from '~/assets/cards/here-there-be-monsters.json';
import classified from '~/assets/cards/classified.json';
import iWantToBelieve from '~/assets/cards/i-want-to-believe.json';
import myStruggle from '~/assets/cards/my-struggle.json';
import fireWalkWithMe from '~/assets/cards/fire-walk-with-me.json';

import type { Card } from '~/types/card';

export const pool: Card[] = [
  ...premiere as unknown as Card[],
  ...theTruthIsOutThere as unknown as Card[],
  ...mulder as unknown as Card[],
  ...scully as unknown as Card[],
  ...believeTheLie as unknown as Card[],
  ...promo as unknown as Card[],
  ...gencon as unknown as Card[],
  ...fightTheFuture as unknown as Card[],
  ...hereThereBeMonsters as unknown as Card[],
  ...classified as unknown as Card[],
  ...iWantToBelieve as unknown as Card[],
  ...myStruggle as unknown as Card[],
  ...fireWalkWithMe as unknown as Card[],
];