import { useEffect, useRef, useState } from 'react';
import { isBrowser } from './helper';
export function useScript(src, attrs = {}) {
    const [status, setStatus] = useState(() => {
        if (!src) {
            return 'idle';
        }
        return 'loading';
    });
    const cached = useRef({});
    useEffect(() => {
        var _a, _b;
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
            setStatus((_b = (_a = script.getAttribute('data-status')) !== null && _a !== void 0 ? _a : cachedScriptStatus) !== null && _b !== void 0 ? _b : 'loading');
        }
        else {
            script = document.createElement('script');
            script.setAttribute('src', src);
            script.setAttribute('data-status', 'loading');
            Object.keys(attrs).forEach((key) => {
                if (!(script === null || script === void 0 ? void 0 : script.getAttribute(key))) {
                    script === null || script === void 0 ? void 0 : script.setAttribute(key, attrs[key]);
                }
            });
            document.body.appendChild(script);
            const setAttributeFromEvent = (event) => {
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
        const setStateFromEvent = (event) => {
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
