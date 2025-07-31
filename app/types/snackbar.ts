export enum SnackbarColor {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}

export interface SnackbarState {
  visible: boolean;
  text: string;
  color: SnackbarColor;
  timeout: number;
}