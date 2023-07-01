"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCss = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
function useCss(_a) {
    var src = _a.src, attrs = __rest(_a, ["src"]);
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