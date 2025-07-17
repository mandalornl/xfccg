import type { SnackbarColor } from '~/utils/snackbar';

export interface SnackbarState {
  visible: boolean;
  text: string;
  color: SnackbarColor;
  timeout: number;
}