"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventListener = void 0;
var react_1 = require("react");
var useIsomorphicLayoutEffect_1 = __importDefault(require("./useIsomorphicLayoutEffect"));
function useEventListener(eventName, handler, element, options) {
    // Create a ref that stores handler
    var savedHandler = (0, react_1.useRef)(handler);
    (0, useIsomorphicLayoutEffect_1.default)(function () {
        savedHandler.current = handler;
    }, [handler]);
    (0, react_1.useEffect)(function () {
        var _a;
        // Define the listening target
        var targetElement = (_a = element === null || element === void 0 ? void 0 : element.current) !== null && _a !== void 0 ? _a : window;
        if (!(targetElement && targetElement.addEventListener))
            return;
        // Create event listener that calls handler function stored in ref
        var listener = function (event) { return savedHandler.current(event); };
        targetElement.addEventListener(eventName, listener, options);
        // Remove event listener on cleanup
        return function () {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
}
exports.useEventListener = useEventListener;
