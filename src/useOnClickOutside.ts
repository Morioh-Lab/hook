import { useRef } from 'react';
import { useEventListener } from './useEventListener';

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(handler: (event: MouseEvent) => void, mouseEvent: 'mousedown' | 'mouseup' = 'mousedown') {
    const ref = useRef<T>();

    useEventListener(mouseEvent, (event) => {
        const el = ref?.current;

        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target as Node)) {
            return;
        }

        handler(event);
    });

    return ref;
}
