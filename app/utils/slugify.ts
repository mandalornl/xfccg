export const slugify = (value: unknown): string => {
  if (!value) {
    return '';
  }

  return String(value)
    .normalize()
    .toLowerCase()
    .replace(/[^0-9a-z-]+/g, '-');
};
