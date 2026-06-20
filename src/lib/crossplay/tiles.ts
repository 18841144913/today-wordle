/**
 * Data layer: NYT Crossplay letter values and bag counts. These differ from
 * Scrabble — mid-tier consonants (K, V, W, Y) are worth more, while common
 * consonants (N, R, S, T) are only 1 point.
 *
 * Source: published Crossplay tile chart (word.tips/nyt-crossplay-cheat).
 */

export const TILE_VALUES: Record<string, number> = {
  a: 1,
  b: 4,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 4,
  h: 3,
  i: 1,
  j: 10,
  k: 6,
  l: 2,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 2,
  v: 6,
  w: 5,
  x: 8,
  y: 4,
  z: 10,
};

/** Number of each tile in the Crossplay bag (3 blanks, 100 tiles total). */
export const TILE_COUNTS: Record<string, number> = {
  blank: 3,
  a: 9,
  b: 2,
  c: 2,
  d: 4,
  e: 12,
  f: 2,
  g: 3,
  h: 3,
  i: 8,
  j: 1,
  k: 1,
  l: 4,
  m: 2,
  n: 5,
  o: 8,
  p: 2,
  q: 1,
  r: 6,
  s: 5,
  t: 6,
  u: 3,
  v: 2,
  w: 2,
  x: 1,
  y: 2,
  z: 1,
};

/** Letters grouped by point value, for rendering the reference table. */
export const VALUE_GROUPS: { points: number; letters: string[] }[] = [
  { points: 1, letters: ["A", "E", "I", "N", "O", "R", "S", "T"] },
  { points: 2, letters: ["D", "L", "U"] },
  { points: 3, letters: ["C", "H", "M", "P"] },
  { points: 4, letters: ["B", "F", "G", "Y"] },
  { points: 5, letters: ["W"] },
  { points: 6, letters: ["K", "V"] },
  { points: 8, letters: ["X"] },
  { points: 10, letters: ["J", "Q", "Z"] },
];
