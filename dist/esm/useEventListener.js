import { useEffect, useRef } from 'react';
import { isBrowser, isString } from './helper';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
export function useEventListener(...args) {
    let target = isBrowser ? window : undefined;
    let event;
    let listener;
    let options;
    isString(args[0]) || Array.isArray(args[0]) ? ([event, listener, options] = args) : ([target, event, listener, options] = args);
    const savedListener = useRef(listener);
    useIsomorphicLayoutEffect(() => {
        savedListener.current = listener;
    }, [listener]);
    useEffect(() => {
        const el = target && 'current' in target ? target.current : target;
        if (!isBrowser || !el)
            return;
        const events = Array.isArray(event) ? event : [event];
        events.forEach((e) => {
            el.addEventListener(e, savedListener.current, options);
        });
        return () => {
            events.forEach((e) => {
                el.removeEventListener(e, savedListener.current, options);
            });
        };
    }, [event, target, options]);
}
