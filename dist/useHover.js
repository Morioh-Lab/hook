"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHover = void 0;
var react_1 = require("react");
var useEventListener_1 = require("./useEventListener");
function useHover() {
    var _a = (0, react_1.useState)(false), hovering = _a[0], setHovering = _a[1];
    var ref = (0, react_1.useRef)(null);
    var handleMouseEnter = function () { return setHovering(true); };
    var handleMouseLeave = function () { return setHovering(false); };
    (0, useEventListener_1.useEventListener)(ref, 'mouseenter', handleMouseEnter);
    (0, useEventListener_1.useEventListener)(ref, 'mouseleave', handleMouseLeave);
    return [ref, hovering];
}
exports.useHover = useHover;
