import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';
import colors from 'vuetify/util/colors';

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'xfccg',
    themes: {
      xfccg: {
        dark: true,
        colors: {
          primary: colors.lightGreen.accent3,
          discord: '#5865F2',
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
