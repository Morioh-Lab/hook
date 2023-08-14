import { RefObject, useEffect, useRef } from 'react';
import { useEventListener } from './useEventListener';

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

export const useClickOutside = <E extends Event = Event>(ref: RefObject<HTMLElement | null>, handler: (event: E) => void, events: Array<keyof DocumentEventMap> = ['mousedown', 'touchstart']) => {
    const savedCallback = useRef(handler);
    useEffect(() => {
        savedCallback.current = handler;
    }, [handler]);

    const listener = (event: any) => {
        const { current: el } = ref;
        el && !el.contains(event.target) && savedCallback.current(event);
    };

    useEventListener(document, events, listener);
};
