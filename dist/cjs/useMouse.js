"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMouse = void 0;
var react_1 = require("react");
var useEventListener_1 = require("./useEventListener");
function useMouse() {
    var _a = (0, react_1.useState)({
        x: 0,
        y: 0,
        elementX: 0,
        elementY: 0,
        elementPositionX: 0,
        elementPositionY: 0,
    }), state = _a[0], setState = _a[1];
    var ref = (0, react_1.useRef)(null);
    var documentRef = (0, react_1.useRef)(document);
    (0, react_1.useLayoutEffect)(function () {
        var handleMouseMove = function (event) {
            var newState = {
                x: event.pageX,
                y: event.pageY,
            };
            if (ref.current instanceof HTMLElement) {
                var _a = ref.current.getBoundingClientRect(), left = _a.left, top_1 = _a.top;
                var elementPositionX = left + window.pageXOffset;
                var elementPositionY = top_1 + window.pageYOffset;
                var elementX = event.pageX - elementPositionX;
                var elementY = event.pageY - elementPositionY;
                // newState.elementX = elementX;
                // newState.elementY = elementY;
                // newState.elementX = elementX;
                // newState.elementY = elementY;
                // newState.elementPositionX = elementPositionX;
                // newState.elementPositionY = elementPositionY;
                Object.assign(newState, { elementX: elementX, elementY: elementY, elementPositionX: elementPositionX, elementPositionY: elementPositionY });
            }
            setState(function (s) { return (__assign(__assign({}, s), newState)); });
        };
        // document.addEventListener('mousemove', handleMouseMove);
        // return () => {
        //     document.removeEventListener('mousemove', handleMouseMove);
        // };
        (0, useEventListener_1.useEventListener)('mousemove', handleMouseMove, documentRef);
    }, []);
    return [state, ref];
}
exports.useMouse = useMouse;
