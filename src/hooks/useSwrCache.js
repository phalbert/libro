// https://markus.oberlehner.net/blog/stale-while-revalidate-data-fetching-composable-with-vue-3-composition-api/
import { reactive, readonly, toRefs } from 'vue';
import LRU from 'lru-cache';

import { asArray } from '../utils';

const CACHE = new LRU({ max: 1024 });

const DEFAULT_OPTIONS = {
    dedupingInterval: 2000,
};

// We use `Symbol` for the state properties to prevent
// consumers of this package to use raw strings.
// See: https://bit.ly/2Lh2lEM
export const STATE = {
    error: Symbol('error'),
    idle: Symbol('idle'),
    loading: Symbol('loading'),
    revalidating: Symbol('revalidating'),
};
export function useSwrCache(parameter, callback, customOptions) {
    const options = {
        ...DEFAULT_OPTIONS,
        ...customOptions,
    };

    // Wrap `parameter` in an array if it is not an array already.
    const parameters = asArray(parameter);
    // Naive way of creating a unique cache key.
    const cacheKey = `${JSON.stringify(parameters)}${callback.toString()}`;
    const cacheKeyDedupe = `${cacheKey}_dedupe`;
    const cachedResponse = CACHE.get(cacheKey);

    // Use the reactive object from the cache or create a new one.
    const response = cachedResponse || reactive({
        data: null,
        error: null,
        reload: undefined,
        state: undefined,
    });

    if (!cachedResponse) CACHE.set(cacheKey, response);

    const load = async () => {
        try {
            // Dedupe requests during the given interval.
            if (CACHE.get(cacheKeyDedupe)) return;

            CACHE.set(cacheKeyDedupe, true, options.dedupingInterval);

            response.state = response.data ? STATE.revalidating : STATE.loading;
            // Wait for the result of the callback and set
            // the reactive `data` property.
            response.data = Object.freeze(await callback(...parameters));
            response.state = STATE.idle;
        } catch (error) {
            console.error(error);
            CACHE.del(cacheKeyDedupe);

            response.error = error;
            response.state = STATE.error;
        }
    };

    response.reload = load;
    load();

    // Using `toRefs()` makes it possible to use
    // spreading in the consuming component.
    // Making the return value `readonly()` prevents
    // users from mutating global state.
    return toRefs(readonly(response));
}