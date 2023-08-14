"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIntersectionObserver = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
function useIntersectionObserver(_a) {
    var _b = _a === void 0 ? {} : _a, threshold = _b.threshold, delay = _b.delay, trackVisibility = _b.trackVisibility, rootMargin = _b.rootMargin, root = _b.root, triggerOnce = _b.triggerOnce, skip = _b.skip, initialInView = _b.initialInView, 
    //fallbackInView,
    onChange = _b.onChange;
    var _c = (0, react_1.useState)(null), ref = _c[0], setRef = _c[1];
    var callback = (0, react_1.useRef)();
    var _d = (0, react_1.useState)({
        inView: !!initialInView,
        entry: undefined,
    }), state = _d[0], setState = _d[1];
    // Store the onChange callback in a `ref`, so we can access the latest instance
    // inside the `useEffect`, but without triggering a rerender.
    callback.current = onChange;
    // Ensure we have a valid thresholds array. If not, use the threshold from the options
    var thresholds = Array.isArray(threshold) ? threshold : [threshold || 0];
    (0, react_1.useEffect)(function () {
        var hasIOSupport = !!window.IntersectionObserver;
        // Ensure we have node ref, and that we shouldn't skip observing
        if (!hasIOSupport || skip || !ref || !helper_1.isBrowser)
            return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var inView = entry && entry.isIntersecting && thresholds.some(function (threshold) { return entry.intersectionRatio >= threshold; });
                setState({ inView: inView, entry: entry });
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
        { root: root, rootMargin: rootMargin, threshold: threshold, trackVisibility: trackVisibility, delay: delay });
        observer.observe(ref);
        return function () { return observer.disconnect(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(threshold), ref, root, rootMargin, triggerOnce, skip, trackVisibility, delay]);
    var result = [setRef, state.inView, state.entry];
    // Support object destructuring, by adding the specific values.
    result.ref = result[0];
    result.inView = result[1];
    result.entry = result[2];
    return result;
}
exports.useIntersectionObserver = useIntersectionObserver;
