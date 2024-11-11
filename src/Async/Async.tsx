import {ReactElement} from "react";
import {usePromise} from "../usePromise/usePromise.ts";

type AsyncProps<T> = {
    provider: (...props: unknown[]) => Promise<T>,
    dependencies?: unknown[],
    onResolving: (_: { retry: () => void }) => ReactElement,
    onOk: (_: { value: T, refresh: () => void }) => ReactElement,
    onError: (_: { error: Error, retry: () => void }) => ReactElement,
}

/**
 * A React component that handles asynchronous operations and renders different UI based on the status of the provided promise.
 *
 * @example
 * <Async
 *      provider={() => getUserWithId(id)}
 *      dependencies={[id]}
 *      onResolving={({retry}) => (
 *          <>
 *              <p>Resolving</p>
 *              <button onClick={retry}>Retry</button>
 *          </>
 *      )}
 *      onOk={({value:user, refresh}) => (
 *          <>
 *              <p>Name: {user.name}</p>
 *              <button onClick={retry}>Retry</button>
 *          </>
 *      )}
 *      onError={({error, retry}) => (
 *          <>
 *              <p>{error.name}: {error.message}</p>
 *              <button onClick={retry}>Retry</button>
 *          </>
 *      )}
 *  />
 *
 * @param {Object} AsyncProps - The properties object for the Async component.
 * @param {() => Promise<T>} AsyncProps.provider - A function that returns a promise for the data to be fetched.
 * @param {Array} [AsyncProps.dependencies] - The dependencies array for the usePromise hook to control re-fetching of data.
 * @param {({retry: () => Promise<T>}) => ReactElement} AsyncProps.onResolving - A render function called when the promise is in resolving state.
 * @param {({value: T, refresh: () => Promise<T>}) => ReactElement} AsyncProps.onOk - A render function called when the promise is fulfilled successfully.
 * @param {({error: Error, retry: () => Promise<T>}) => ReactElement} AsyncProps.onError - A render function called when the promise is rejected.
 *
 * @return {ReactElement} The rendered React element based on the status of the asynchronous operation.
 */
export function Async<T>({
    provider,
    dependencies,
    onResolving,
    onOk,
    onError
}: AsyncProps<T>): ReactElement {
    const promise = usePromise<T>(provider, dependencies ?? []);

    switch (promise.status) {
        case "resolving":
            return onResolving({retry: promise.execute});
        case "ok":
            return onOk({value: promise.value, refresh: promise.execute});
        case "error":
            return onError({error: promise.error, retry: promise.execute});
        default:
            throw new Error("Unreachable state");
    }
}