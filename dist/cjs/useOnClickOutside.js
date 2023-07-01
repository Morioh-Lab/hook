"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnClickOutside = void 0;
var react_1 = require("react");
var useEventListener_1 = require("./useEventListener");
function useOnClickOutside(handler, mouseEvent) {
    if (mouseEvent === void 0) { mouseEvent = 'mousedown'; }
    var ref = (0, react_1.useRef)();
    (0, useEventListener_1.useEventListener)(mouseEvent, function (event) {
        var el = ref === null || ref === void 0 ? void 0 : ref.current;
        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target)) {
            return;
        }
        handler(event);
    });
    return ref;
}
exports.useOnClickOutside = useOnClickOutside;
