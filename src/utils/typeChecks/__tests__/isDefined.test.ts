import { expect, test } from 'vitest';
import isDefined from '../isDefined';

test('Returns true when value is a number', () => {
 expect(isDefined(3)).toBe(true);
});

test('Returns true when value is a string', () => {
 expect(isDefined(3)).toBe(true);
});

test('Returns true when value is an object', () => {
 expect(isDefined({ name: 'something', email: 'something@gmail.com' })).toBe(
  true
 );
});

test('Returns false when value is null', () => {
 expect(isDefined(null)).toBe(false);
});

test('Returns false when value is undefined', () => {
 expect(isDefined(undefined)).toBe(false);
});
