import type { SnackbarState } from '~/types/snackbar';
import { SnackbarColor } from '~/utils/snackbar';

export const useSnackbarState = () => {
  const state = useState('snackbar', (): SnackbarState => ({
    visible: false,
    text: '',
    color: SnackbarColor.INFO,
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
    success: setter(SnackbarColor.SUCCESS),
    info: setter(SnackbarColor.INFO),
    warning: setter(SnackbarColor.WARNING),
    error: setter(SnackbarColor.ERROR),
  };
};