export const escapeRegex = (value: string): string => (
  '\\^$*+?.()|{}[]'.includes(value) ? `\\${value}` : value
);
