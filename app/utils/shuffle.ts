export function shuffle<T extends readonly unknown[]>(value: T): T[number][] {
  const copy = [ ...value ] as T[number][];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [ copy[i], copy[j] ] = [ copy[j], copy[i] ];
  }

  return copy;
}
