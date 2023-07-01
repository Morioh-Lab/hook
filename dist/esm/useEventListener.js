import { useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
function useEventListener(eventName, handler, element, options) {
    // Create a ref that stores handler
    const savedHandler = useRef(handler);
    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(() => {
        var _a;
        // Define the listening target
        const targetElement = (_a = element === null || element === void 0 ? void 0 : element.current) !== null && _a !== void 0 ? _a : window;
        if (!(targetElement && targetElement.addEventListener))
            return;
        // Create event listener that calls handler function stored in ref
        const listener = (event) => savedHandler.current(event);
        targetElement.addEventListener(eventName, listener, options);
        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
}
// function useEventListeners<KW extends keyof WindowEventMap, KH extends keyof HTMLElementEventMap, KM extends keyof MediaQueryListEventMap, T extends HTMLElement | MediaQueryList | void = void>(
//     eventName: KW[] | KH[] | KM[],
//     handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | MediaQueryListEventMap[KM] | Event) => void,
//     element?: RefObject<T>,
//     options?: boolean | AddEventListenerOptions
// ) {
//     for (let i = 0; i < eventName.length; i++) {
//         const e = eventName[i];
//         useEventListener(e, handler, element, options);
//     }
// }
export { useEventListener };
