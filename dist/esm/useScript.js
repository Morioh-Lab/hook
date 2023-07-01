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
import { useEffect, useState } from 'react';
import { isBrowser } from './helper';
export function useScript(_a) {
    var { src } = _a, attrs = __rest(_a, ["src"]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        // Nothing to do on server, or if no src specified, or
        // if loading has already resolved to "loaded" or "error" state.
        if (!isBrowser || !src || !loading || error)
            return;
        let el = document.querySelector(`script[src="${src}"]`);
        if (el) {
            setLoading(false);
        }
        const onLoad = (e) => {
            el === null || el === void 0 ? void 0 : el.setAttribute('data-status', e.type === 'loading' ? 'ready' : 'error');
            setLoading(false);
        };
        const onError = (e) => {
            setError(e);
        };
        el = document.createElement('script');
        el.setAttribute('src', src);
        el.setAttribute('data-status', 'loading');
        Object.keys(attrs).forEach((key) => {
            if (!(el === null || el === void 0 ? void 0 : el.getAttribute(key))) {
                el === null || el === void 0 ? void 0 : el.setAttribute(key, attrs[key]);
            }
        });
        el.addEventListener('load', onLoad);
        el.addEventListener('error', onError);
        document.head.appendChild(el);
        return () => {
            el === null || el === void 0 ? void 0 : el.removeEventListener('load', onLoad);
            el === null || el === void 0 ? void 0 : el.removeEventListener('error', onError);
        };
    }, [src]);
    return { loading, error };
}
