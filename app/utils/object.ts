export function isObject<T extends Record<string, unknown>>(value: unknown): value is T {
  return !!value && typeof value === 'object' && (value.constructor === Object || value.constructor === undefined);
}