/** Use the page name when an alt is missing or still a filename. */
export function descriptiveAlt(alt: string | undefined, fallback: string) {
  const value = alt?.trim();
  if (!value) return fallback;
  if (/[_.]/.test(value) || /csm_|DSC/i.test(value)) return fallback;
  if (!/\s/.test(value) && (value.length < 12 || /\d/.test(value))) return fallback;
  return value;
}
