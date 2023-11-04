import { expect, test } from 'vitest';
import { assert } from '../assert';

test('Does not throw an error when condition is true', () => {
 expect(() => assert(true, 'Some error message')).not.toThrowError();
});

test('Throws an error when condition is false', () => {
 expect(() => assert(false, 'Some error message')).toThrowError();
});

test('Expected error message is thrown', () => {
 const errorMessage: string = 'Some error message';
 expect(() => assert(false, errorMessage)).toThrowError(errorMessage);
});
