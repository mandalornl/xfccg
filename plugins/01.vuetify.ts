// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import colors from 'vuetify/util/colors';

import '@/assets/main.scss';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    defaults: {
      VField: {
        color: 'primary',
      },
      VCheckbox: {
        color: 'primary',
      },
      VRadio: {
        color: 'primary',
      },
      VRadioGroup: {
        color: 'primary',
      },
      VSwitch: {
        color: 'primary',
      },
      VSlider: {
        color: 'primary',
      },
      VRangeSlider: {
        color: 'primary',
      },
      VOtpInput: {
        baseColor: 'primary',
      },
      VProgressLinear: {
        color: 'primary',
      },
    },
    theme: {
      defaultTheme: 'default',
      themes: {
        default: {
          dark: true,
          colors: {
            primary: colors.lightGreen.accent3,
            discord: '#5865F2',
          },
        },
      },
    },
  });

  app.vueApp.use(vuetify);
});