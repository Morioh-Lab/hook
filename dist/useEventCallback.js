"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventCallback = void 0;
var react_1 = require("react");
var useIsomorphicLayoutEffect_1 = __importDefault(require("./useIsomorphicLayoutEffect"));
function useEventCallback(fn) {
    var ref = (0, react_1.useRef)(function () {
        throw new Error('Cannot call an event handler while rendering.');
    });
    (0, useIsomorphicLayoutEffect_1.default)(function () {
        ref.current = fn;
    }, [fn]);
    return (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return ref.current.apply(ref, args);
    }, [ref]);
}
exports.useEventCallback = useEventCallback;
