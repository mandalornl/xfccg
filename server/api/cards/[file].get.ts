import {
  readFile,
  stat,
} from 'node:fs/promises';
import { resolve } from 'node:path';

export default defineEventHandler(async (event) => {
  try {
    const file = getRouterParam(event, 'file');
    const filename = resolve(`./app/assets/cards/${file}`);

    const json = await readFile(filename, 'utf8');
    const stats = await stat(filename);

    setHeaders(event, {
      'Last-Modified': stats.mtime.toUTCString(),
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return JSON.parse(json);
  } catch {
    throw createError({
      status: 404,
      message: 'File not found',
    });
  }
});
