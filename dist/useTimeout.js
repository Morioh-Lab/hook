"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimeout = void 0;
var react_1 = require("react");
var useIsomorphicLayoutEffect_1 = __importDefault(require("./useIsomorphicLayoutEffect"));
function useTimeout(callback, delay) {
    var savedCallback = (0, react_1.useRef)(callback);
    // Remember the latest callback if it changes.
    (0, useIsomorphicLayoutEffect_1.default)(function () {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the timeout.
    (0, react_1.useEffect)(function () {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return;
        }
        var id = setTimeout(function () { return savedCallback.current(); }, delay);
        return function () { return clearTimeout(id); };
    }, [delay]);
}
exports.useTimeout = useTimeout;
