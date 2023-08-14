import { useState, useRef, useLayoutEffect } from 'react';
import { useEventListener } from './useEventListener';

export function useMouse<T extends HTMLElement>() {
    const [state, setState] = useState({
        x: 0,
        y: 0,
        elementX: 0,
        elementY: 0,
        elementPositionX: 0,
        elementPositionY: 0,
    });

    const ref = useRef<T>(null);
    // const documentRef = useRef<Document>(document);

    useLayoutEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            let newState = {
                x: event.pageX,
                y: event.pageY,
            };

            if (ref.current instanceof HTMLElement) {
                const { left, top } = ref.current.getBoundingClientRect();
                const elementPositionX = left + window.pageXOffset;
                const elementPositionY = top + window.pageYOffset;
                const elementX = event.pageX - elementPositionX;
                const elementY = event.pageY - elementPositionY;

                // newState.elementX = elementX;
                // newState.elementY = elementY;
                // newState.elementX = elementX;
                // newState.elementY = elementY;
                // newState.elementPositionX = elementPositionX;
                // newState.elementPositionY = elementPositionY;

                Object.assign(newState, { elementX, elementY, elementPositionX, elementPositionY });
            }

            setState((s) => ({ ...s, ...newState }));
        };

        useEventListener(document, 'mousemove', handleMouseMove);
    }, []);

    return [state, ref];
}
