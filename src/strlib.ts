export const lcp = (x: string, y: string): number => {
  const n = Math.min(x.length, y.length);
  let i = 0;
  for (; i < n; i++) {
    if (x[i] !== y[i]) break;
  }
  return i;
};
