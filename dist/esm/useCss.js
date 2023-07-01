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
import { useEffect } from 'react';
import { isBrowser } from './helper';
export function useCss(_a) {
    var { src } = _a, attrs = __rest(_a, ["src"]);
    useEffect(() => {
        let el = document.querySelector(`link[href="${src}"]`);
        if (!isBrowser || !src || el)
            return;
        el = document.createElement('link');
        el.setAttribute('rel', 'stylesheet');
        el.setAttribute('type', 'text/css');
        el.href = src;
        Object.keys(attrs).forEach((key) => {
            if (!(el === null || el === void 0 ? void 0 : el.getAttribute(key))) {
                el === null || el === void 0 ? void 0 : el.setAttribute(key, attrs[key]);
            }
        });
        document.head.append(el);
        return () => el === null || el === void 0 ? void 0 : el.remove();
    }, [src]);
}
