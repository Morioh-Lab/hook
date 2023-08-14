"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIdle = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
var useEventListener_1 = require("./useEventListener");
function useIdle(ms) {
    if (ms === void 0) { ms = 1000 * 60; }
    var _a = (0, react_1.useState)(false), idle = _a[0], setIdle = _a[1];
    // const documentRef = useRef<Document>(document);
    var timeoutId;
    var handleTimeout = function () { return setIdle(true); };
    var handleEvent = (0, helper_1.throttle)(function () {
        setIdle(false);
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(handleTimeout, ms);
    }, 500);
    var handleVisibilityChange = function () {
        if (!document.hidden) {
            handleEvent();
        }
    };
    (0, useEventListener_1.useEventListener)(['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'], handleEvent);
    (0, useEventListener_1.useEventListener)(document, 'visibilitychange', handleVisibilityChange);
    (0, react_1.useEffect)(function () {
        timeoutId = window.setTimeout(handleTimeout, ms);
        return function () {
            window.clearTimeout(timeoutId);
        };
    }, [ms]);
    return idle;
}
exports.useIdle = useIdle;
