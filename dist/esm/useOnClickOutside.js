import { useRef } from 'react';
import { useEventListener } from './useEventListener';
export function useOnClickOutside(handler, mouseEvent = 'mousedown') {
    const ref = useRef();
    useEventListener(mouseEvent, (event) => {
        const el = ref === null || ref === void 0 ? void 0 : ref.current;
        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target)) {
            return;
        }
        handler(event);
    });
    return ref;
}
