/// <reference types="react" />
interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}
export declare function useIntersectionObserver({ threshold, root, rootMargin, freezeOnceVisible }: Args): (import("react").MutableRefObject<Element | null | undefined> | IntersectionObserverEntry | undefined)[];
export {};
