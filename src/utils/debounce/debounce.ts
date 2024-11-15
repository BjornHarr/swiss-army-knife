import isDefined from '../typeChecks/isDefined';

type GenericFunction<P extends Array<unknown>> = (...params: P) => void;
type DebounceFunctions = {
 readonly cancel: () => void;
 readonly flush: () => void;
};

/**
 * Returns a debounced version of the provided function that delays its execution until after a specified delay, and cancels any previous calls to the function that were scheduled but not yet executed.
 * @param functionToDebounce The function to be debounced.
 * @param delay The delay, in milliseconds, before the function is executed.
 * @returns A debounced version of the provided function.
 * @remarks
 * - The returned function can be cancelled using the `cancel` method.
 * - The returned function can be immediately executed and any scheduled calls cancelled using the `flush` method.
 * @example
 * const debounced = debounce(() => console.log('Hello'), 100);
 * debounced();
 * // Nothing is logged to the console
 * // After 100ms, 'Hello' is logged to the console
 *
 * @example
 * const debounced = debounce(() => console.log('Hello'), 100);
 * debounced();
 * debounced.cancel();
 * // Nothing is logged to the console
 *
 * @example
 * const debounced = debounce(() => console.log('Hello'), 100);
 * debounced();
 * debounced.flush();
 * // 'Hello' is logged to the console
 * // Nothing is logged to the console after 100ms
 */
export default function debounce<P extends Array<unknown>>(
 functionToDebounce: (...params: P) => void,
 delay = 300
): GenericFunction<P> & DebounceFunctions {
 let timer: NodeJS.Timeout | undefined;
 let recievedParams: P | undefined;

 /**
  * Calls the provided function after a specified delay, and cancels any previous calls to the function that were scheduled but not yet executed.
  * @param functionToDebounce The function to be called after the delay.
  * @param delay The delay, in milliseconds, before the function is called.
  * @param params The parameters to be passed to the function when it is called.
  */
 function debounced(...params: P): void {
  recievedParams = params;
  clearTimeout(timer);

  timer = setTimeout(() => {
   functionToDebounce(...params);
   timer = undefined;
  }, delay);
 }

 /**
  * Cancels any scheduled calls to the debounced function.
  * @returns void
  * @example
  * const debounced = debounce(() => console.log('Hello'), 100);
  * debounced();
  * debounced.cancel();
  * Nothing is logged to the console
  */
 debounced.cancel = function (): void {
  clearTimeout(timer);
  timer = undefined;
 };
 debounced.cancel = debounced.cancel.bind(debounced);

 /**
  * Calls the debounced function immediately, and cancels any scheduled calls to the debounced function.
  * @returns void
  * @example
  * const debounced = debounce(() => console.log('Hello'), 100);
  * debounced();
  * debounced.flush();
  * // 'Hello' is logged to the console
  * // Nothing is logged to the console after 100ms
  */
 debounced.flush = function (): void {
  this.cancel();

  if (isDefined(recievedParams)) {
   functionToDebounce(...recievedParams);
  }
 };
 debounced.flush = debounced.flush.bind(debounced);

 return debounced;
}
