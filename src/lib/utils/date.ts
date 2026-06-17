export const LAUNCH_DATE = "2021-06-19";

/** Canonical "today" for the site = current date in US Eastern time (NYT HQ). */
export function getTodayEtDate(): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(new Date());
}

export function isValidDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

export function addDays(date: string, delta: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number {
  const a = Date.parse(`${from}T00:00:00Z`);
  const b = Date.parse(`${to}T00:00:00Z`);
  return Math.round((b - a) / 86_400_000);
}

export function formatLongDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  });
}

/** Year string for grouping the archive. */
export function getYear(date: string): string {
  return date.slice(0, 4);
}

/** The N dates immediately before `fromDate`, newest first. */
export function getRecentDates(fromDate: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => addDays(fromDate, -(i + 1)));
}

/** Every puzzle date from `today` back to launch, newest first. */
export function getAllDatesDescending(today: string): string[] {
  const total = daysBetween(LAUNCH_DATE, today) + 1;
  return Array.from({ length: Math.max(total, 1) }, (_, i) => addDays(today, -i));
}
