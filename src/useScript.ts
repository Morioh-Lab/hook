import { useEffect, useRef, useState } from 'react';
import { isBrowser } from './helper';

interface IHTMLAttributes {
    [key: string]: any;
}

export function useScript(src: string, attrs: IHTMLAttributes = {}) {
    const [status, setStatus] = useState(() => {
        if (!src) {
            return 'idle';
        }

        return 'loading';
    });

    const cached = useRef<Record<string, 'idle' | 'loading' | 'ready' | 'error' | undefined>>({});

    useEffect(() => {
        if (!src || !isBrowser) {
            return;
        }

        const cachedScriptStatus = cached.current[src];
        if (cachedScriptStatus === 'ready' || cachedScriptStatus === 'error') {
            setStatus(cachedScriptStatus);
            return;
        }

        let script = document.querySelector(`script[src="${src}"]`);

        if (script) {
            setStatus(script.getAttribute('data-status') ?? cachedScriptStatus ?? 'loading');
        } else {
            script = document.createElement('script');

            script.setAttribute('src', src);
            script.setAttribute('data-status', 'loading');
            Object.keys(attrs).forEach((key) => {
                if (!script?.getAttribute(key)) {
                    script?.setAttribute(key, attrs[key]);
                }
            });
            document.body.appendChild(script);

            const setAttributeFromEvent = (event: Event) => {
                const scriptStatus = event.type === 'load' ? 'ready' : 'error';

                if (script) {
                    script.setAttribute('data-status', scriptStatus);
                }
            };

            script.addEventListener('load', setAttributeFromEvent);
            script.addEventListener('error', setAttributeFromEvent);

            // useEventListener(script, 'load', setAttributeFromEvent);
            // useEventListener(script, 'error', setAttributeFromEvent);
        }

        const setStateFromEvent = (event: Event) => {
            const newStatus = event.type === 'load' ? 'ready' : 'error';
            setStatus(newStatus);
            cached.current[src] = newStatus;
        };

        // useEventListener(script, 'load', setStateFromEvent);
        // useEventListener(script, 'error', setStateFromEvent);

        script.addEventListener('load', setStateFromEvent);
        script.addEventListener('error', setStateFromEvent);

        return () => {
            if (script) {
                script.removeEventListener('load', setStateFromEvent);
                script.removeEventListener('error', setStateFromEvent);
            }
        };
    }, [src]);

    return status;
}
