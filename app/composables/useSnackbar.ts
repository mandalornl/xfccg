import {
  type SnackbarState,
  SnackbarColor,
} from '~/types/snackbar';

export const useSnackbar = () => {
  const state = useState<SnackbarState>('snackbar', () => ({
    visible: false,
    text: '',
    color: SnackbarColor.Info,
    timeout: -1,
  }));

  const setter = (color: SnackbarColor) => (text: string, timeoutMillis: number = 10000) => {
    state.value = {
      color,
      text,
      timeout: Math.random() + timeoutMillis,
      visible: true,
    };
  };

  const reset = () => {
    state.value.visible = false;
    state.value.timeout = -1;
  };

  return {
    state,
    reset,
    success: setter(SnackbarColor.Success),
    info: setter(SnackbarColor.Info),
    warning: setter(SnackbarColor.Warning),
    error: setter(SnackbarColor.Error),
  };
};
