"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCss = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
function useCss(src, attrs) {
    if (attrs === void 0) { attrs = {}; }
    (0, react_1.useEffect)(function () {
        var el = document.querySelector("link[href=\"".concat(src, "\"]"));
        if (!helper_1.isBrowser || !src || el)
            return;
        el = document.createElement('link');
        el.setAttribute('rel', 'stylesheet');
        el.setAttribute('type', 'text/css');
        el.href = src;
        Object.keys(attrs).forEach(function (key) {
            if (!(el === null || el === void 0 ? void 0 : el.getAttribute(key))) {
                el === null || el === void 0 ? void 0 : el.setAttribute(key, attrs[key]);
            }
        });
        document.head.append(el);
        return function () { return el === null || el === void 0 ? void 0 : el.remove(); };
    }, [src]);
}
exports.useCss = useCss;
