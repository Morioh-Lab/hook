import { useEffect } from 'react';
import { isBrowser } from './helper';
export function useCss(src, attrs = {}) {
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
