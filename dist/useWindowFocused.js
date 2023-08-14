"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowFocused = void 0;
var react_1 = require("react");
var useEventListener_1 = require("./useEventListener");
function useWindowFocused() {
    // get the initial state
    var _a = (0, react_1.useState)(function () {
        return typeof document !== 'undefined' && document.hasFocus();
    }), focus = _a[0], setFocus = _a[1];
    var onFocus = function () { return setFocus(true); };
    var onBlur = function () { return setFocus(false); };
    (0, useEventListener_1.useEventListener)('focus', onFocus);
    (0, useEventListener_1.useEventListener)('blur', onBlur);
    return focus;
}
exports.useWindowFocused = useWindowFocused;
