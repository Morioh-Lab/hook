import { useEffect, useRef, useState } from 'react';
import { isBrowser } from './helper';

export interface IIntersectionObserverOptions extends IntersectionObserverInit {
    /** The IntersectionObserver interface's read-only `root` property identifies the Element or Document whose bounds are treated as the bounding box of the viewport for the element which is the observer's target. If the `root` is null, then the bounds of the actual document viewport are used.*/
    root?: Element | null;
    /** Margin around the root. Can have values similar to the CSS margin property, e.g. `10px 20px 30px 40px` (top, right, bottom, left). */
    rootMargin?: string;
    /** Number between `0` and `1` indicating the percentage that should be visible before triggering. Can also be an `array` of numbers, to create multiple trigger points. */
    threshold?: number | number[];
    /** Only trigger the inView callback once */
    triggerOnce?: boolean;
    /** Skip assigning the observer to the `ref` */
    skip?: boolean;
    /** Set the initial value of the `inView` boolean. This can be used if you expect the element to be in the viewport to start with, and you want to trigger something when it leaves. */
    initialInView?: boolean;
    /** Fallback to this inView state if the IntersectionObserver is unsupported, and a polyfill wasn't loaded */
    //fallbackInView?: boolean;
    /** Track the actual visibility of the element */
    trackVisibility?: boolean;
    /** Set a minimum delay between notifications */
    delay?: number;
    /** Call this function whenever the in view state changes */
    onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
}

/**
 * The Hook response supports both array and object destructing
 */
export type IntersectionObserverResponse = [(node?: Element | null) => void, boolean, IntersectionObserverEntry | undefined] & {
    ref: (node?: Element | null) => void;
    // ref: RefObject<Element> | null;
    inView: boolean;
    entry?: IntersectionObserverEntry;
};

type IIntersectionObserverState = {
    inView: boolean;
    entry?: IntersectionObserverEntry;
};

export function useIntersectionObserver({
    threshold,
    delay,
    trackVisibility,
    rootMargin,
    root,
    triggerOnce,
    skip,
    initialInView,
    //fallbackInView,
    onChange,
}: IIntersectionObserverOptions = {}): IntersectionObserverResponse {
    const [ref, setRef] = useState<Element | null>(null);
    const callback = useRef<IIntersectionObserverOptions['onChange']>();
    const [state, setState] = useState<IIntersectionObserverState>({
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
        if (!hasIOSupport || skip || !ref || !isBrowser) return;

        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry) => {
                    const inView = entry && entry.isIntersecting && thresholds.some((threshold) => entry.intersectionRatio >= threshold);

                    setState({ inView, entry });

                    if (callback.current) callback.current(inView, entry);

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
            { root, rootMargin, threshold, trackVisibility, delay }
        );

        observer.observe(ref);

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(threshold), ref, root, rootMargin, triggerOnce, skip, trackVisibility, delay]);

    const result = [setRef, state.inView, state.entry] as IntersectionObserverResponse;

    // Support object destructuring, by adding the specific values.
    result.ref = result[0];
    result.inView = result[1];
    result.entry = result[2];

    return result;
}
