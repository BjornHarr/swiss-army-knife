/**
 * Function that returns true if value is undefined, and false if value is something else
 * @param value Value to check for undefined
 * @returns Boolean of whether the value is undefined or not
 */
export default function isUndefined<T>(
 value: T | undefined
): value is undefined {
 return value === undefined;
}
