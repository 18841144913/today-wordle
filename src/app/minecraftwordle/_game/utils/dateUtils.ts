// Utils layer: pure date helpers. No business rules, no data access.

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function localMidnight(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

const EPOCH = localMidnight(new Date(2022, 0, 1)); // reference day 0

/** Whole days elapsed since the epoch, in the player's local timezone. */
export function dayIndexFor(date: Date = new Date()): number {
  return Math.floor((localMidnight(date) - EPOCH) / MS_PER_DAY);
}

export function isYesterday(dayIndex: number, referenceDayIndex: number): boolean {
  return dayIndex === referenceDayIndex - 1;
}
