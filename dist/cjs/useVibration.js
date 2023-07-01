"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVibration = void 0;
var react_1 = require("react");
function useVibration(value) {
    if (value === void 0) { value = 200; }
    return (0, react_1.useCallback)(function () {
        navigator.vibrate(value);
    }, [value]);
}
exports.useVibration = useVibration;
