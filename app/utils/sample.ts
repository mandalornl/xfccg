export function sample<T>(value: readonly T[]): T | undefined {
  const index = Math.floor(Math.random() * value.length);

  return value[index];
}