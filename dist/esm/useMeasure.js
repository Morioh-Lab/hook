import { useRef, useState, useLayoutEffect } from 'react';
export function useMeasure() {
    const ref = useRef(null);
    const [rect, setRect] = useState({
        width: null,
        height: null,
    });
    useLayoutEffect(() => {
        if (!ref.current)
            return;
        const observer = new ResizeObserver(([entry]) => {
            if (entry && entry.contentRect) {
                setRect({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, []);
    return [ref, rect];
}
