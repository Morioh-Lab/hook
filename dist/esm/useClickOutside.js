import { useEffect, useRef } from 'react';
import { off, on } from './helper';
// export function useOnClickOutside<T extends HTMLElement = HTMLElement>(handler: (event: MouseEvent) => void, mouseEvent: 'mousedown' | 'mouseup' = 'mousedown') {
//     const ref = useRef<T>();
//     useEventListener(mouseEvent, (event) => {
//         const el = ref?.current;
//         // Do nothing if clicking ref's element or descendent elements
//         if (!el || el.contains(event.target as Node)) {
//             return;
//         }
//         handler(event);
//     });
//     return ref;
// }
export const useClickOutside = (ref, onClickAway, events = ['mousedown', 'touchstart']) => {
    const savedCallback = useRef(onClickAway);
    useEffect(() => {
        savedCallback.current = onClickAway;
    }, [onClickAway]);
    useEffect(() => {
        const handler = (event) => {
            const { current: el } = ref;
            el && !el.contains(event.target) && savedCallback.current(event);
        };
        for (const eventName of events) {
            on(document, eventName, handler);
            // useEventListener(eventName, handler, document)
        }
        return () => {
            for (const eventName of events) {
                off(document, eventName, handler);
            }
        };
    }, [events, ref]);
};
