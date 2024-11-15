/**
 * Function that returns true if value is null, and false if value is something else
 * @param value Value to check for null
 * @returns Boolean of whether the value is null or not
 */
export default function isNull<T>(value: T | null): value is null {
 return value === null;
}
