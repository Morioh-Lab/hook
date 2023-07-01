"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLockBodyScroll = void 0;
var react_1 = require("react");
function useLockBodyScroll() {
    (0, react_1.useEffect)(function () {
        var originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return function () {
            document.body.style.overflow = originalStyle;
        };
    }, []);
}
exports.useLockBodyScroll = useLockBodyScroll;
