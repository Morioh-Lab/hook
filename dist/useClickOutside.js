"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickOutside = void 0;
var react_1 = require("react");
var useEventListener_1 = require("./useEventListener");
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
var useClickOutside = function (ref, handler, events) {
    if (events === void 0) { events = ['mousedown', 'touchstart']; }
    var savedCallback = (0, react_1.useRef)(handler);
    (0, react_1.useEffect)(function () {
        savedCallback.current = handler;
    }, [handler]);
    var listener = function (event) {
        var el = ref.current;
        el && !el.contains(event.target) && savedCallback.current(event);
    };
    (0, useEventListener_1.useEventListener)(document, events, listener);
};
exports.useClickOutside = useClickOutside;
