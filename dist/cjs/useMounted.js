"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMounted = void 0;
var react_1 = require("react");
function useMounted() {
    var _a = (0, react_1.useState)(false), mounted = _a[0], setMounted = _a[1];
    (0, react_1.useEffect)(function () {
        setMounted(true);
    }, []);
    return mounted;
}
exports.useMounted = useMounted;
