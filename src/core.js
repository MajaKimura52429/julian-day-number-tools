const MS_PER_DAY = 86400000;
const J1970 = 2440587.5;

/**
 * Converts a JavaScript Date to a Julian Day Number (JDN).
 *
 * The JDN is defined as the number of days since noon UT on 1 January 4713 BC
 * in the proleptic Julian calendar. The conversion uses the Unix epoch
 * (1970-01-01T00:00:00Z) as the reference point: JDN = date.getTime() / 86400000 + 2440587.5.
 *
 * @param {Date} date - A JavaScript Date object.
 * @returns {number} The Julian Day Number.
 * @throws {TypeError} If the argument is not a valid Date.
 */
export function dateToJulianDay(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('Expected a valid Date object');
  }
  return date.getTime() / MS_PER_DAY + J1970;
}

/**
 * Converts a Julian Day Number to a JavaScript Date.
 *
 * The result is a Date object representing the instant corresponding to the
 * given JDN. The time is set to the exact millisecond.
 *
 * @param {number} jdn - The Julian Day Number.
 * @returns {Date} A Date object.
 * @throws {TypeError} If jdn is not a finite number.
 */
export function julianDayToDate(jdn) {
  if (typeof jdn !== 'number' || !Number.isFinite(jdn)) {
    throw new TypeError('Expected a finite number');
  }
  const ms = (jdn - J1970) * MS_PER_DAY;
  return new Date(ms);
}

/**
 * Alias for dateToJulianDay.
 * Kept for symmetry with toJulianDay/fromJulianDay naming.
 */
export const toJulianDay = dateToJulianDay;

/**
 * Alias for julianDayToDate.
 */
export const fromJulianDay = julianDayToDate;
