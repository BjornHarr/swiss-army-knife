import { expect, test } from 'vitest';
import isUndefined from '../isUndefined';

test('Returns true when value is undefined', () => {
 expect(isUndefined(undefined)).toBe(true);
});

test('Returns false when value is null', () => {
 expect(isUndefined(null)).toBe(false);
});

test('Returns false when value is a number', () => {
 expect(isUndefined(3)).toBe(false);
});

test('Returns false when value is a string', () => {
 expect(isUndefined(3)).toBe(false);
});

test('Returns false when value is an object', () => {
 expect(isUndefined({ name: 'something', email: 'something@gmail.com' })).toBe(
  false
 );
});
