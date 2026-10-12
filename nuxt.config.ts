import { URL } from 'node:url';
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const url = new URL(process.env.BASE_URL || 'http://localhost:3000');

const isProduction = process.env.NODE_ENV === 'production';
const baseURL = url.pathname === '/' ? '/' : `${url.pathname}/`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: false,
  devtools: {
    enabled: !isProduction,
  },
  app: {
    baseURL,
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` },
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      login: {
        email: !isProduction && process.env.LOGIN_EMAIL || '',
        password: !isProduction && process.env.LOGIN_PASSWORD || '',
      },
    },
  },
  routeRules: {
    '/my-decks/**': { ssr: false },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/supabase',
    'vuetify-nuxt-module',
  ],
  fonts: {
    defaults: {
      weights: [ 100, 300, 400, 500, 700, 900 ],
    },
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: [
        '/account',
        '/change-password',
        '/my-decks',
        '/my-decks/*',
        '/logout',
      ],
      saveRedirectToCookie: true,
    },
  },
  vuetify: {
    moduleOptions: {
      prefixComposables: [ 'useLayout' ],
    },
    vuetifyOptions: './app/vuetify.options.ts',
  },
  hooks: {
    async 'prerender:routes'({ routes }) {
      const dirname = resolve('./app/assets/cards');
      const files = await readdir(dirname);

      for (const filename of files) {
        routes.add(`/api/cards/${filename}`);
      }

      routes.add('/api/cards/sets.json');
      routes.add('/api/cards/types.json');
    },
  },
  sourcemap: {
    client: 'hidden',
  },
  experimental: {
    payloadExtraction: true,
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
    optimizeDeps: {
      include: [
        '@tiptap/html',
        '@tiptap/markdown',
        '@tiptap/starter-kit',
        '@tiptap/extension-character-count',
        '@tiptap/extension-link',
        '@tiptap/vue-3',
      ],
    },
  },
});
