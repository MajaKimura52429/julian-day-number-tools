# julian-day-number-tools

Converts between JavaScript `Date` objects and Julian Day Numbers (JDN), the continuous day count used in astronomy and chronology.

```js
import { dateToJulianDay, julianDayToDate } from 'julian-day-number-tools';

const date = new Date('2000-01-01T12:00:00Z');
const jdn = dateToJulianDay(date);
console.log(jdn); // 2451545

const back = julianDayToDate(jdn);
console.log(back.toISOString()); // '2000-01-01T12:00:00.000Z'
```

## Why this exists

JavaScript's `Date` is a Unix-epoch-based timestamp with millisecond resolution. Julian Day Numbers are a floating-point day count with noon as the day boundary. Converting between them directly is a one-liner, but the constant and the direction of the offset are easy to get wrong, and the epoch is not intuitive. This library pins the conversion to the standard definition (JDN 2440587.5 = 1970-01-01T00:00:00Z) and provides symmetrical functions with clear names.

The trade-off is that we do not attempt to handle leap seconds. JavaScript `Date` ignores them, and the JDN convention also treats days as exactly 86400 seconds for most practical purposes. If you need leap-second-aware conversions, this library is not for you.

## API

- `dateToJulianDay(date)` — takes a `Date`, returns a `number` (the JDN). Throws `TypeError` if the argument is not a valid `Date`.
- `julianDayToDate(jdn)` — takes a finite `number`, returns a `Date`. Throws `TypeError` if the argument is not a finite number.
- `toJulianDay` — alias for `dateToJulianDay`.
- `fromJulianDay` — alias for `julianDayToDate`.

The aliases exist so that code can read either as "convert to JDN" or "convert from JDN" without remembering which noun is which.

## Awkward edge

The JDN changes at noon UT, not midnight. A `Date` at 00:00:00Z has a JDN ending in `.5`, while noon has an integer JDN. If you are comparing JDN values for calendar dates, round to the nearest integer to get the JDN for the civil day starting at midnight.

## Performance

The window keeps a bounded buffer, so `push` is constant time and memory does not
grow with the length of the stream. `peak` and `trough` are linear in the window
size, which is the trade that keeps `push` cheap.

