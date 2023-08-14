"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMeasure = void 0;
var react_1 = require("react");
function useMeasure() {
    var ref = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)({
        width: null,
        height: null,
    }), rect = _a[0], setRect = _a[1];
    (0, react_1.useLayoutEffect)(function () {
        if (!ref.current)
            return;
        var observer = new ResizeObserver(function (_a) {
            var entry = _a[0];
            if (entry && entry.contentRect) {
                setRect({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });
        observer.observe(ref.current);
        return function () {
            observer.disconnect();
        };
    }, []);
    return [ref, rect];
}
exports.useMeasure = useMeasure;
