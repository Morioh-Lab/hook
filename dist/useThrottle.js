"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThrottle = void 0;
var react_1 = require("react");
function useThrottle(value, interval) {
    if (interval === void 0) { interval = 500; }
    var _a = (0, react_1.useState)(value), throttledValue = _a[0], setThrottledValue = _a[1];
    var lastUpdated = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(function () {
        var now = Date.now();
        if (now >= lastUpdated.current + interval) {
            lastUpdated.current = now;
            setThrottledValue(value);
        }
        else {
            var id_1 = window.setTimeout(function () {
                lastUpdated.current = now;
                setThrottledValue(value);
            }, interval);
            return function () { return window.clearTimeout(id_1); };
        }
    }, [value, interval]);
    return throttledValue;
}
exports.useThrottle = useThrottle;
