"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrientation = exports.defaultState = void 0;
var react_1 = require("react");
var useEventListener_1 = require("./useEventListener");
exports.defaultState = {
    angle: 0,
    type: 'landscape-primary',
};
function useOrientation(initialState) {
    if (initialState === void 0) { initialState = exports.defaultState; }
    var _a = (0, react_1.useState)(initialState), state = _a[0], setState = _a[1];
    var onOrientationChangeEvent = function () {
        var orientation = screen.orientation;
        var angle = orientation.angle, type = orientation.type;
        if (!orientation) {
            setState(initialState);
        }
        setState({ angle: angle, type: type });
    };
    // useEffect(() => {
    //     window.addEventListener('orientationchange', onOrientationChangeEvent, true);
    //     return () => {
    //         window.addEventListener('orientationchange', onOrientationChangeEvent, true);
    //     };
    // }, []);
    (0, useEventListener_1.useEventListener)('orientationchange', onOrientationChangeEvent);
    return state;
}
exports.useOrientation = useOrientation;
