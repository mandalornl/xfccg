import {
  type SnackbarState,
  SnackbarColor,
} from '~/types/snackbar';

export const useSnackbarState = () => {
  const snackbarState = useState('snackbar', (): SnackbarState => ({
    visible: false,
    text: '',
    color: SnackbarColor.Info,
    timeout: -1,
  }));

  const setter = (color: SnackbarColor) => (text: string, timeoutMillis: number = 10000) => {
    snackbarState.value = {
      color,
      text,
      timeout: Math.random() + timeoutMillis,
      visible: true,
    };
  };

  const reset = () => {
    snackbarState.value.visible = false;
    snackbarState.value.timeout = -1;
  };

  return {
    snackbarState,
    reset,
    success: setter(SnackbarColor.Success),
    info: setter(SnackbarColor.Info),
    warning: setter(SnackbarColor.Warning),
    error: setter(SnackbarColor.Error),
  };
};
