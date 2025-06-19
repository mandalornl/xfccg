import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

const production = process.env.NODE_ENV === 'production';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  devtools: {
    enabled: !production,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      login: {
        email: !production && process.env.LOGIN_EMAIL || '',
        password: !production && process.env.LOGIN_PASSWORD || '',
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
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: [
        '/account',
      ],
    },
  },
});