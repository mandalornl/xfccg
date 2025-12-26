import { URL } from 'node:url';

const url = new URL(process.env.BASE_URL || 'http://localhost:3000');

const isProduction = process.env.NODE_ENV === 'production';
const baseURL = url.pathname === '/' ? '/' : `${url.pathname}/`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
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
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/supabase',
    'vuetify-nuxt-module',
  ],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: [
        '/account',
        '/change-password',
        '/my-decks',
        '/logout',
      ],
      saveRedirectToCookie: true,
    },
  },
  vuetify: {
    vuetifyOptions: './app/vuetify.options.ts'
  }
});
