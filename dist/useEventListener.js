"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventListener = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
var useIsomorphicLayoutEffect_1 = __importDefault(require("./useIsomorphicLayoutEffect"));
function useEventListener() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var target = helper_1.isBrowser ? window : undefined;
    var event;
    var listener;
    var options;
    (0, helper_1.isString)(args[0]) || Array.isArray(args[0]) ? (event = args[0], listener = args[1], options = args[2], args) : (target = args[0], event = args[1], listener = args[2], options = args[3], args);
    var savedListener = (0, react_1.useRef)(listener);
    (0, useIsomorphicLayoutEffect_1.default)(function () {
        savedListener.current = listener;
    }, [listener]);
    (0, react_1.useEffect)(function () {
        var el = target && 'current' in target ? target.current : target;
        if (!helper_1.isBrowser || !el)
            return;
        var events = Array.isArray(event) ? event : [event];
        events.forEach(function (e) {
            el.addEventListener(e, savedListener.current, options);
        });
        return function () {
            events.forEach(function (e) {
                el.removeEventListener(e, savedListener.current, options);
            });
        };
    }, [event, target, options]);
}
exports.useEventListener = useEventListener;
