#!/usr/bin/env node

import {
  readFile,
  writeFile,
} from 'node:fs/promises';
import { URL } from 'node:url';

const pool = await Promise.all([
  'premiere',
  'the-truth-is-out-there',
  '101361',
  '22364',
  'believe-the-lie',
  'resist-or-serve',
  'promo',
  'gen-con',
  'fight-the-future',
  'here-there-be-monsters',
  'classified',
  'i-want-to-believe',
  'my-struggle',
  'fire-walk-with-me',
].map(async (name) => {
  const filename = new URL(`../app/assets/cards/${name}.json`, import.meta.url);
  const json = await readFile(filename, 'utf-8');

  return JSON.parse(json);
})).then((result) => result.flat());

const filters = Object.entries({
  activators: 'activators',
  cost: 'costs',
  episode: 'episodes',
  keywords: 'keywords',
  tags: 'tags',
});

const collator = new Intl.Collator('en', {
  sensitivity: 'base',
  numeric: true,
});

for (const [
  key,
  name,
] of filters) {
  const data = pool
    .map((card) => card[key])
    .flat()
    .filter((value, index, self) => !!value && self.indexOf(value) === index)
    .sort((a, b) => {
      if (key === 'cost') {
        const [
          costA,
          poolA,
        ] = a.split(' ');
        const [
          costB,
          poolB,
        ] = b.split(' ');

        if (poolA === poolB) {
          return collator.compare(costA, costB);
        }

        return collator.compare(poolA, poolB);
      }

      return collator.compare(a, b);
    });

  const filename = new URL(`../app/assets/filters/${name}.json`, import.meta.url);

  await writeFile(filename, JSON.stringify(data, null, 2));
}
