/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';
import isDefined from '../typeChecks/isDefined';

type PromiseResponse<V, E> =
 | {
    isResolving: true;
    execute: () => void;
   }
 | {
    isResolving: false;
    isOk: true;
    value: V;
    execute: () => void;
   }
 | {
    isResolving: false;
    isOk: false;
    error: E;
    execute: () => void;
   };

export function usePromise<V, E = any>(
 provider: () => Promise<V>,
 dependencies: unknown[],
 options: { executeOnMount: boolean } = { executeOnMount: true }
): PromiseResponse<V, E> {
 const [hasExecutedOnMount, setHasExecutedOnMount] = useState<boolean>(false);
 const [isResolving, setIsResolving] = useState<boolean>(
  options.executeOnMount
 );

 const [value, setValue] = useState<V>();
 const [error, setError] = useState<any>();

 const execute = useCallback(async () => {
  setIsResolving(true);
  setValue(undefined);
  setError(undefined);

  try {
   const promise = await provider();
   setValue(promise);
  } catch (e) {
   setError(e);
  } finally {
   setIsResolving(false);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [setIsResolving, setValue, setError, ...dependencies]);

 useEffect(() => {
  if (!isResolving) {
   execute();
  } else if (options.executeOnMount && !hasExecutedOnMount) {
   execute();
   setHasExecutedOnMount(true);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [options.executeOnMount, hasExecutedOnMount, execute, ...dependencies]);

 if (isResolving) {
  return { isResolving: true, execute: execute };
 }

 if (!isDefined(value)) {
  return { isResolving: false, isOk: false, error: error, execute: execute };
 }

 return { isResolving: false, isOk: true, value: value, execute: execute };
}
