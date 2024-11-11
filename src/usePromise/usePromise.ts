import { useCallback, useEffect, useState } from "react";

type ReturnType<V> = {
    status: 'resolving',
    execute: () => void
} | {
    status: 'ok',
    execute: () => void,
    value: V
} | {
    status: 'error',
    execute: () => void,
    error: Error
};


/**
 * usePromise is a custom hook that manages the state of a promise, providing
 * updates on its status (resolving, ok, or error) and the resolved value or
 * encountered error.
 *
 * @param {function} provider - A function that returns a promise which the hook will manage.
 * @param {Array} dependencies - An array of dependencies that will trigger the promise execution when changed.
 *
 * @return An object representing the state of the promise, including the status,
 *         the resolved value (if available), or the error (if encountered), along with a function
 *         to re-execute the promise manually.
 */
export function usePromise<V>(
    provider: () => Promise<V>,
    dependencies: unknown[]
): ReturnType<V> {
    const [state, setState] = useState<ReturnType<V>>({
        status: 'resolving',
        execute: () => console.log("initial state"),
    });

    const executePromise = useCallback(() => {
        setState({ status: 'resolving', execute: executePromise });

        provider()
            .then((value: V) => setState({ status: 'ok', execute: executePromise, value }))
            .catch((error: Error) => setState({ status: 'error', execute: executePromise, error }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provider, ...dependencies]);

    useEffect(() => {
        executePromise();
        setState(prevState => ({ ...prevState, execute: executePromise }));
    }, [executePromise]);

    return state;
}