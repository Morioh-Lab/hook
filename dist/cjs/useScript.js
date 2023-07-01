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
exports.useScript = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
function useScript(_a) {
    var src = _a.src, attrs = __rest(_a, ["src"]);
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(), error = _c[0], setError = _c[1];
    (0, react_1.useEffect)(function () {
        // Nothing to do on server, or if no src specified, or
        // if loading has already resolved to "loaded" or "error" state.
        if (!helper_1.isBrowser || !src || !loading || error)
            return;
        var el = document.querySelector("script[src=\"".concat(src, "\"]"));
        if (el) {
            setLoading(false);
        }
        var onLoad = function (e) {
            el === null || el === void 0 ? void 0 : el.setAttribute('data-status', e.type === 'loading' ? 'ready' : 'error');
            setLoading(false);
        };
        var onError = function (e) {
            setError(e);
        };
        el = document.createElement('script');
        el.setAttribute('src', src);
        el.setAttribute('data-status', 'loading');
        Object.keys(attrs).forEach(function (key) {
            if (!(el === null || el === void 0 ? void 0 : el.getAttribute(key))) {
                el === null || el === void 0 ? void 0 : el.setAttribute(key, attrs[key]);
            }
        });
        el.addEventListener('load', onLoad);
        el.addEventListener('error', onError);
        document.head.appendChild(el);
        return function () {
            el === null || el === void 0 ? void 0 : el.removeEventListener('load', onLoad);
            el === null || el === void 0 ? void 0 : el.removeEventListener('error', onError);
        };
    }, [src]);
    return { loading: loading, error: error };
}
exports.useScript = useScript;
