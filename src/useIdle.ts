import { useEffect, useRef, useState } from 'react';
import { throttle } from './helper';
import { useEventListener } from './useEventListener';

export function useIdle(ms = 1000 * 60) {
    const [idle, setIdle] = useState(false);
    // const documentRef = useRef<Document>(document);

    let timeoutId: ReturnType<typeof setTimeout> | number;

    const handleTimeout = () => setIdle(true);

    const handleEvent = throttle(() => {
        setIdle(false);

        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(handleTimeout, ms);
    }, 500);

    const handleVisibilityChange = () => {
        if (!document.hidden) {
            handleEvent();
        }
    };

    useEventListener(['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'], handleEvent);
    useEventListener(document, 'visibilitychange', handleVisibilityChange);

    useEffect(() => {
        timeoutId = window.setTimeout(handleTimeout, ms);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [ms]);

    return idle;
}
