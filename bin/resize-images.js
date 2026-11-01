#!/usr/bin/env node

import {
  readdir,
  writeFile,
  rm,
} from 'fs/promises';
import {
  URL,
  fileURLToPath,
} from 'url';
import sharp from 'sharp';

const dir = fileURLToPath(new URL('images', import.meta.url));

const files = await readdir(dir, {
  withFileTypes: true,
});

const getBasename = (name) => {
  if (/^xf\d{2}-\d{4}x\d.jpg$/.test(name)) {
    return name;
  }

  const match = name.match(/\d{4}/);

  if (!match) {
    return name.toLowerCase();
  }

  return `xf26-${match[0]}x5.jpg`;
};

for (const dirent of files) {
  if (!dirent.isFile() || dirent.name === '.DS_Store') {
    continue;
  }

  console.debug(dirent.name);

  const filename = `${dir}/${dirent.name}`;

  const buffer = await sharp(filename)
    .extract({
      left: 0,
      top: 0,
      width: 1,
      height: 1,
    })
    .resize(400)
    .extend({
      top: 22,
      right: 22,
      bottom: 22,
      left: 22,
    })
    .jpeg({
      mozjpeg: true,
    })
    .toBuffer();

  const basename = getBasename(dirent.name);
  const newFilename = `${dir}/${basename}`;

  if (filename !== newFilename) {
    await rm(filename);
  }

  await writeFile(newFilename, buffer);
}
