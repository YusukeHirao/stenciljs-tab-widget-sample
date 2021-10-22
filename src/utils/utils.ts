let i = 0;
export function uid() {
  return `uid${i++}`;
}

export function loopAt<T>(a: T[], i: number) {
  if (i < 0) {
    i = a.length + i;
  }
  return a[i % a.length];
}
