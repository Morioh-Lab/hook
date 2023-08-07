"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickOutside = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
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
var useClickOutside = function (ref, onClickAway, events) {
    if (events === void 0) { events = ['mousedown', 'touchstart']; }
    var savedCallback = (0, react_1.useRef)(onClickAway);
    (0, react_1.useEffect)(function () {
        savedCallback.current = onClickAway;
    }, [onClickAway]);
    (0, react_1.useEffect)(function () {
        var handler = function (event) {
            var el = ref.current;
            el && !el.contains(event.target) && savedCallback.current(event);
        };
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var eventName = events_1[_i];
            (0, helper_1.on)(document, eventName, handler);
            // useEventListener(eventName, handler, document)
        }
        return function () {
            for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
                var eventName = events_2[_i];
                (0, helper_1.off)(document, eventName, handler);
            }
        };
    }, [events, ref]);
};
exports.useClickOutside = useClickOutside;
