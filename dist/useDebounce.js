"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounceCallback = exports.useDebounce = void 0;
var react_1 = require("react");
function useDebounce(value, delay) {
    var _a = (0, react_1.useState)(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () { return setDebouncedValue(value); }, delay || 500);
        return function () { return clearTimeout(timer); };
    }, [value, delay]);
    return debouncedValue;
}
exports.useDebounce = useDebounce;
// https://stackoverflow.com/questions/56283920/how-to-debounce-a-callback-in-functional-component-using-hooks
/*export function useDebounceCallback<A extends any[]>(callback: (...args: A) => void, wait: number) {
    // track args & timeout handle between calls
    const argsRef = useRef<A>();
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    function cleanup() {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    }

    // make sure our timeout gets cleared if
    // our consuming component gets unmounted
    useEffect(() => cleanup, []);

    return function debounceCallback(...args: A) {
        // capture latest args
        argsRef.current = args;

        // clear debounce timer
        cleanup();

        // start waiting again
        timeout.current = setTimeout(() => {
            if (argsRef.current) {
                callback(...argsRef.current);
            }
        }, wait);
    };
}
*/
function useDebounceCallback(callback, wait) {
    var timeout = (0, react_1.useRef)();
    return (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var later = function () {
            clearTimeout(timeout.current);
            callback.apply(void 0, args);
        };
        clearTimeout(timeout.current);
        timeout.current = setTimeout(later, wait);
    }, [callback, wait]);
}
exports.useDebounceCallback = useDebounceCallback;
