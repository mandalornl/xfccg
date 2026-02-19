import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';
import colors from 'vuetify/util/colors';

const discord = '#5865F2';

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          discord,
          primary: colors.lightGreen.accent3,
        },
      },
      light: {
        colors: {
          discord,
        },
      },
    },
  },
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
});
