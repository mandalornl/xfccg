#!/usr/bin/env node

import { writeFile } from 'fs/promises';
import {
  URL,
  fileURLToPath,
} from 'url';
import XLSX, { utils } from 'xlsx';

// TODO: Change values before running!
const sheetName = '';
const set = '';
const rarity = '';
const createdBy = '';

const workbook = await XLSX.readFile(fileURLToPath(new URL('X-Files CCG.xlsx', import.meta.url)));
const sheetIndex = workbook.SheetNames.indexOf(sheetName);
const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];

const abbreviations = {
  AI: 'Alien Investigation',
  BEH: 'Behavioral',
  CI: 'Criminal Investigation',
  EC: 'Evidence Collection',
  OBS: 'Observation',
  OCC: 'Occult Investigation',
  SCI: 'Sciences',
  SUB: 'Subterfuge',
  BUR: 'Bureaucracy',
  COM: 'Computer',
  MED: 'Medical',
  LRC: 'Long Range Combat',
  CRC: 'Close Range Combat',
  HEALTH: 'Health',
  RES: 'Resources',
};

const data = utils.sheet_to_json(sheet, {
  header: [
    'title',
    'type',
    'id',
    'quantity',
    'episode',
    'cost',
    'keywords',
    'activators',
    'advanced',
    'gameEffect',
    'skills',
    'bioOrDialog',
  ],
  range: 2,
  blankrows: false,
  defval: null,
});

const getGameEffect = (value, type) => {
  if (!value || type === 'Site' || type === 'Credits') {
    return {};
  }

  return {
    gameEffect: value
      .replace(/\r\n|\r|\n/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replaceAll('’', '\'')
      .replaceAll('[[RP icon]]', '[RP]')
      .replaceAll('[RP icon]', '[RP]')
      .replaceAll('[[RP]]', '[RP]')
      .replaceAll('[[CP icon]]', '[CP]')
      .replaceAll('[CP icon]', '[CP]')
      .replaceAll('[[CP]]', '[CP]')
      .replaceAll('[[RP] ]cost', '[RP] cost')
      .replaceAll('[[PP]]', '[*P]'),
  };
};

const getEpisode = (value, type) => {
  if (!value || value.trim() === 'N/A' || type === 'Credits') {
    return {};
  }

  let episode = value
    .replace(/\r\n|\r|\n/g, '')
    .trim();

  if (episode.startsWith('"')) {
    episode = episode.slice(1);
  }

  if (episode.endsWith('"')) {
    episode = episode.slice(0, -1);
  }

  return {
    episode,
  };
};

const getCost = (value, type) => {
  if (!value || type === 'Credits') {
    return {};
  }

  return {
    cost: value
      .trim()
      .replace(/^([rcp*]p)\s?(\d+|x)$/i, '$2 $1')
      .replace('PP', '*P')
      .toUpperCase(),
  };
};

const getSkills = (value, type) => {
  if (!value || type === 'Credits') {
    return {};
  }

  return {
    skills: value
      .replace(/\r\n|\r|\n/g, ',')
      .split(',')
      .reduce((result, skill) => {
        const [
          key,
          value,
        ] = skill
          .replace(/[^A-Z0-9:/]+/g, '')
          .split(':');

        return {
          ...result,
          [abbreviations[key]]: /\d/.test(value) ? Number(value) : value,
        };
      }, {}),
  };
};

const getKeywords = (value, type) => {
  if (!value || type === 'Credits') {
    return {};
  }

  return {
    keywords: value
      .replace(/\r\n|\r|\n/g, ',')
      .split(',')
      .map((value) => (
        value
          .trim()
          .replace(/[^\w\s]+/g, '')
      ))
      .filter(Boolean),
  };
};

const getPrerequisiteAndQuestion = (value, type) => {
  if (!value || type !== 'Site' || type === 'Credits') {
    return {};
  }

  const [
    prerequisite,
    question,
  ] = value.split('\r\n');

  return {
    prerequisite: prerequisite.replace('PREREQUISITE: ', ''),
    question: question.replace('QUESTION: ', ''),
  };
};

const getActivators = (value, type) => {
  if (!value || type === 'Site' || type === 'Credits') {
    return {};
  }

  return {
    activators: value
      .replace(/\bor\b/g, '')
      .replaceAll('/', ',')
      .replace(/\r\n|\r|\n/g, ',')
      .split(',')
      .map((value) => (
        value
          .trim()
          .replace(/[^\w\s]+/g, '')
      ))
      .filter(Boolean),
  };
};

const getBioOrDialogue = (value, type) => {
  if (!value || type === 'Credits') {
    return {};
  }

  const text = value
    .replace(/\r\n|\r|\n/g, '\n')
    .replace(/(\s+|\n)?--/, ' - ')
    .replaceAll('—', '-')
    .replace(/([^-])-([^-])/g, '$1 - $2')
    .replace(/\s{2,}/g, ' ')
    .replaceAll('’', '\'')
    .replaceAll('?\'', '?');

  if (text.includes('" - ') || text.includes(': "')) {
    return {
      dialogue: text,
    };
  }

  return {
    bio: text,
  };
};

const getTags = (advanced, type) => {
  if (type === 'Credits') {
    return {};
  }

  return {
    tags: [
      advanced === 'X' ? 'Advanced' : 'Basic',
    ],
  };
};

const cards = data
  .filter((card) => !!card.id)
  .map((card) => {
    const type = card.type?.trim?.();

    return {
      id: card.id?.trim?.(),
      title: card.title
        .replaceAll('**', '')
        .trim(),
      set,
      rarity,
      type,
      ...getEpisode(card.episode, type),
      ...getCost(card.cost, type),
      ...getSkills(card.skills, type),
      ...getKeywords(card.keywords, type),
      ...getPrerequisiteAndQuestion(card.gameEffect, type),
      ...getActivators(card.activators, type),
      ...getGameEffect(card.gameEffect, type),
      ...getBioOrDialogue(card.bioOrDialog, type),
      ...getTags(card.advanced, type),
      createdBy,
    };
  });

const filename = new URL('cards.json', import.meta.url);

await writeFile(filename, JSON.stringify(cards, null, 2));
