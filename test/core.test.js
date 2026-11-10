import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dateToJulianDay, julianDayToDate, toJulianDay, fromJulianDay } from '../src/index.js';

test('dateToJulianDay converts Unix epoch to JDN 2440587.5', () => {
  const date = new Date('1970-01-01T00:00:00Z');
  assert.equal(dateToJulianDay(date), 2440587.5);
});

test('julianDayToDate converts JDN 2440587.5 back to Unix epoch', () => {
  const date = julianDayToDate(2440587.5);
  assert.equal(date.toISOString(), '1970-01-01T00:00:00.000Z');
});

test('dateToJulianDay handles a date before the epoch', () => {
  const date = new Date('1969-12-31T00:00:00Z');
  assert.equal(dateToJulianDay(date), 2440586.5);
});

test('julianDayToDate handles a JDN before the epoch', () => {
  const date = julianDayToDate(2440586.5);
  assert.equal(date.toISOString(), '1969-12-31T00:00:00.000Z');
});

test('dateToJulianDay handles a date with a fractional day', () => {
  const date = new Date('1970-01-01T12:00:00Z');
  assert.equal(dateToJulianDay(date), 2440588.0);
});

test('julianDayToDate handles a fractional JDN', () => {
  const date = julianDayToDate(2440588.0);
  assert.equal(date.toISOString(), '1970-01-01T12:00:00.000Z');
});

test('dateToJulianDay returns a number', () => {
  const result = dateToJulianDay(new Date());
  assert.equal(typeof result, 'number');
});

test('julianDayToDate returns a Date object', () => {
  const result = julianDayToDate(2440587.5);
  assert.ok(result instanceof Date);
});

test('dateToJulianDay throws on invalid Date', () => {
  assert.throws(() => dateToJulianDay(new Date('invalid')), TypeError);
});

test('dateToJulianDay throws on non-Date argument', () => {
  assert.throws(() => dateToJulianDay(123), TypeError);
});

test('julianDayToDate throws on non-finite number', () => {
  assert.throws(() => julianDayToDate(NaN), TypeError);
  assert.throws(() => julianDayToDate(Infinity), TypeError);
  assert.throws(() => julianDayToDate('2440587.5'), TypeError);
});

test('aliases toJulianDay and fromJulianDay are the same functions', () => {
  assert.equal(toJulianDay, dateToJulianDay);
  assert.equal(fromJulianDay, julianDayToDate);
});
