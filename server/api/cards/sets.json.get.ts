import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';

import { CardSet } from '~/types/card';

export default defineEventHandler(async (event) => {
  const filename = resolve('./app/types/card.ts');
  const stats = await stat(filename);

  setHeaders(event, {
    'Last-Modified': stats.mtime.toUTCString(),
    'Cache-Control': 'public, max-age=3600',
    'Content-Type': 'application/json; charset=UTF-8',
  });

  return Object.values(CardSet);
});
