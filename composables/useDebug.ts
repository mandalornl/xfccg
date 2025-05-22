export const useDebug = (error: Error) => {
  if (!import.meta.dev) {
    return;
  }

  console.error(error);
};