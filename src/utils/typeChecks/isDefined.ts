import isNull from './isNull';
import isUndefined from './isUndefined';

/**
 * Function that returns false if value is undefined or null. Otherwise it returns true
 * @param value Value to check is not undefined or null
 * @returns Boolean of whether the value is defined or nor
 */
export default function isDefined<T>(value: T | undefined | null): value is T {
 return !isNull(value) && !isUndefined(value);
}
