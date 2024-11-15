import { expect, test } from 'vitest';
import isNull from '../isNull';

test('Returns true when value is null', () => {
 expect(isNull(null)).toBe(true);
});

test('Returns false when value is undefined', () => {
 expect(isNull(undefined)).toBe(false);
});

test('Returns false when value is a number', () => {
 expect(isNull(3)).toBe(false);
});

test('Returns false when value is a string', () => {
 expect(isNull(3)).toBe(false);
});

test('Returns false when value is an object', () => {
 expect(isNull({ name: 'something', email: 'something@gmail.com' })).toBe(
  false
 );
});
