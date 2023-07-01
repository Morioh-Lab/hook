"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDelay = void 0;
var react_1 = require("react");
var useTimeout_1 = require("./useTimeout");
function useDelay(delay) {
    var _a = (0, react_1.useState)(false), state = _a[0], setState = _a[1];
    (0, useTimeout_1.useTimeout)(function () { return setState(true); }, delay);
    return state;
}
exports.useDelay = useDelay;
