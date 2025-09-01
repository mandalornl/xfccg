import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction ? '/xfccg/' : '/';

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
  build: {
    transpile: [
      'vuetify',
    ],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/supabase',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({
          autoImport: true,
        }));
      });
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  supabase: {
    types: './app/types/database.ts',
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: [
        '/account',
        '/change-password',
        '/my-decks',
      ],
    },
  },
});