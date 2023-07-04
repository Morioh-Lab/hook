import { useEffect } from 'react';
import { isBrowser } from './helper';

interface IHTMLAttributes {
    [key: string]: any;
}

export function useCss(src: string, attrs: IHTMLAttributes = {}) {
    useEffect(() => {
        let el: HTMLLinkElement | null = document.querySelector(`link[href="${src}"]`);

        if (!isBrowser || !src || el) return;

        el = document.createElement('link');
        el.setAttribute('rel', 'stylesheet');
        el.setAttribute('type', 'text/css');
        el.href = src;
        Object.keys(attrs).forEach((key) => {
            if (!el?.getAttribute(key)) {
                el?.setAttribute(key, attrs[key]);
            }
        });
        document.head.append(el);

        return () => el?.remove();
    }, [src]);
}
