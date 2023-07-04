import { useEffect, useRef, useState } from 'react';
import { isBrowser } from './helper';
export function useIntersectionObserver({ threshold, delay, trackVisibility, rootMargin, root, triggerOnce, skip, initialInView, 
//fallbackInView,
onChange, } = {}) {
    const [ref, setRef] = useState(null);
    const callback = useRef();
    const [state, setState] = useState({
        inView: !!initialInView,
        entry: undefined,
    });
    // Store the onChange callback in a `ref`, so we can access the latest instance
    // inside the `useEffect`, but without triggering a rerender.
    callback.current = onChange;
    // Ensure we have a valid thresholds array. If not, use the threshold from the options
    const thresholds = Array.isArray(threshold) ? threshold : [threshold || 0];
    useEffect(() => {
        const hasIOSupport = !!window.IntersectionObserver;
        // Ensure we have node ref, and that we shouldn't skip observing
        if (!hasIOSupport || skip || !ref || !isBrowser)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const inView = entry && entry.isIntersecting && thresholds.some((threshold) => entry.intersectionRatio >= threshold);
                setState({ inView, entry });
                if (callback.current)
                    callback.current(inView, entry);
                // @ts-ignore support IntersectionObserver v2
                if (trackVisibility && typeof entry.isVisible === 'undefined') {
                    // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.
                    // @ts-ignore
                    entry.isVisible = inView;
                }
                if (entry.isIntersecting && triggerOnce) {
                    // If it should only trigger once, unobserve the element after it's inView
                    observer.disconnect();
                }
            });
        }, 
        // @ts-ignore
        { root, rootMargin, threshold, trackVisibility, delay });
        observer.observe(ref);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(threshold), ref, root, rootMargin, triggerOnce, skip, trackVisibility, delay]);
    const result = [setRef, state.inView, state.entry];
    // Support object destructuring, by adding the specific values.
    result.ref = result[0];
    result.inView = result[1];
    result.entry = result[2];
    return result;
}
