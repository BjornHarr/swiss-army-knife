/**
 * Throws an error if condition is false
 *
 * @param condition expression to assert
 * @param errorMessage thrown error when expression is false
 */
export function assert(
 condition: boolean,
 errorMessage: string
): asserts condition {
 if (!condition) {
  throw new Error(errorMessage);
 }
}
