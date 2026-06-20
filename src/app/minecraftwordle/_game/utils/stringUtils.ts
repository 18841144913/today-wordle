// Utils layer: pure string helpers.

export function isLetter(key: string): boolean {
  return /^[a-zA-Z]$/.test(key);
}

export function normalizeGuess(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}
