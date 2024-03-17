/**
 * Format `Date` to `yyyy-MM-dd`
 * @param date the `Date` to be formatted
 * @returns the date formatted as `yyyy-MM-dd`
 */
export function formatDate(date: Date): string {
  const day = date.getDate()
  const month = date.getMonth() + 1
  return `${date.getFullYear()}-${month < 10 ? '0' + month.toString() : month.toString()}-${day < 10 ? '0' + day.toString() : day.toString()}`
}

/**
 * Resolve image path for Svelte + Electron integration.
 * Basically resolve "/path" to "./path" when required.
 * @param img the image path
 * @returns the image path resolved to work both in dev and prod
 */
export function resolveImgPath(img: string): string {
  return import.meta.env.MODE === 'development'
    ? img
    : '.' + img
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function noTypeCheck(x: any): any { return x }
