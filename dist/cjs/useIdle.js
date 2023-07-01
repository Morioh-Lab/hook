"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIdle = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
var useEventListener_1 = require("./useEventListener");
function useIdle(ms) {
    if (ms === void 0) { ms = 1000 * 60; }
    var _a = (0, react_1.useState)(false), idle = _a[0], setIdle = _a[1];
    var documentRef = (0, react_1.useRef)(document);
    (0, react_1.useEffect)(function () {
        var timeoutId;
        var handleTimeout = function () {
            setIdle(true);
        };
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
        timeoutId = window.setTimeout(handleTimeout, ms);
        (0, useEventListener_1.useEventListener)('mousemove', handleEvent);
        (0, useEventListener_1.useEventListener)('mousedown', handleEvent);
        (0, useEventListener_1.useEventListener)('resize', handleEvent);
        (0, useEventListener_1.useEventListener)('keydown', handleEvent);
        (0, useEventListener_1.useEventListener)('touchstart', handleEvent);
        (0, useEventListener_1.useEventListener)('wheel', handleEvent);
        (0, useEventListener_1.useEventListener)('visibilitychange', handleVisibilityChange, documentRef);
        // window.addEventListener('mousemove', handleEvent);
        // window.addEventListener('mousedown', handleEvent);
        // window.addEventListener('resize', handleEvent);
        // window.addEventListener('keydown', handleEvent);
        // window.addEventListener('touchstart', handleEvent);
        // window.addEventListener('wheel', handleEvent);
        // document.addEventListener('visibilitychange', handleVisibilityChange);
        return function () {
            // window.removeEventListener('mousemove', handleEvent);
            // window.removeEventListener('mousedown', handleEvent);
            // window.removeEventListener('resize', handleEvent);
            // window.removeEventListener('keydown', handleEvent);
            // window.removeEventListener('touchstart', handleEvent);
            // window.removeEventListener('wheel', handleEvent);
            // document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.clearTimeout(timeoutId);
        };
    }, [ms]);
    return idle;
}
exports.useIdle = useIdle;
