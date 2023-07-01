import { useEffect, useState } from 'react';
import { isBrowser } from './helper';

interface IScriptProps {
    src: string;
    [key: string]: any;
}

export function useScript({ src, ...attrs }: IScriptProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Event>();

    useEffect(() => {
        // Nothing to do on server, or if no src specified, or
        // if loading has already resolved to "loaded" or "error" state.
        if (!isBrowser || !src || !loading || error) return;

        let el: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);

        if (el) {
            setLoading(false);
        }

        const onLoad = (e: Event) => {
            el?.setAttribute('data-status', e.type === 'loading' ? 'ready' : 'error');
            setLoading(false);
        };
        const onError = (e: Event) => {
            setError(e);
        };

        el = document.createElement('script');

        el.setAttribute('src', src);
        el.setAttribute('data-status', 'loading');

        Object.keys(attrs).forEach((key) => {
            if (!el?.getAttribute(key)) {
                el?.setAttribute(key, attrs[key]);
            }
        });

        el.addEventListener('load', onLoad);
        el.addEventListener('error', onError);

        document.head.appendChild(el);

        return () => {
            el?.removeEventListener('load', onLoad);
            el?.removeEventListener('error', onError);
        };
    }, [src]);

    return { loading, error };
}
