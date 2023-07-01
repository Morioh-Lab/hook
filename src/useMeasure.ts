import { useRef, useState, useLayoutEffect } from 'react';

interface IMeasureState {
    width: null | number;
    height: null | number;
}

export function useMeasure() {
    const ref = useRef<Element | null>(null);
    const [rect, setRect] = useState<IMeasureState>({
        width: null,
        height: null,
    });

    useLayoutEffect(() => {
        if (!ref.current) return;

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
