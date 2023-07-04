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
    inView: boolean;
    entry?: IntersectionObserverEntry;
};
export declare function useIntersectionObserver({ threshold, delay, trackVisibility, rootMargin, root, triggerOnce, skip, initialInView, onChange, }?: IIntersectionObserverOptions): IntersectionObserverResponse;
