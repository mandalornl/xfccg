export const useDebug = (error: unknown) => {
  if (!import.meta.dev) {
    return;
  }

  console.error(error);
};