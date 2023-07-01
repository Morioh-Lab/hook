"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHover = void 0;
var react_1 = require("react");
var useEventListener_1 = require("./useEventListener");
function useHover() {
    var _a = (0, react_1.useState)(false), hovering = _a[0], setHovering = _a[1];
    var ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        // const node = ref?.current;
        if (!(ref === null || ref === void 0 ? void 0 : ref.current))
            return;
        var handleMouseEnter = function () { return setHovering(true); };
        var handleMouseLeave = function () { return setHovering(false); };
        (0, useEventListener_1.useEventListener)('mouseenter', handleMouseEnter, ref);
        (0, useEventListener_1.useEventListener)('mouseleave', handleMouseLeave, ref);
        // node.addEventListener('mouseenter', handleMouseEnter);
        // node.addEventListener('mouseleave', handleMouseLeave);
        // return () => {
        //     node.removeEventListener('mouseenter', handleMouseEnter);
        //     node.removeEventListener('mouseleave', handleMouseLeave);
        // };
    }, []);
    return [ref, hovering];
}
exports.useHover = useHover;
