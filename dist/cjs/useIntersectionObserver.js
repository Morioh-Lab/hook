"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIntersectionObserver = void 0;
var react_1 = require("react");
function useIntersectionObserver(_a) {
    var _b = _a.threshold, threshold = _b === void 0 ? 0 : _b, _c = _a.root, root = _c === void 0 ? null : _c, _d = _a.rootMargin, rootMargin = _d === void 0 ? '0%' : _d, _e = _a.freezeOnceVisible, freezeOnceVisible = _e === void 0 ? false : _e;
    var ref = (0, react_1.useRef)();
    var _f = (0, react_1.useState)(), entry = _f[0], setEntry = _f[1];
    var frozen = (entry === null || entry === void 0 ? void 0 : entry.isIntersecting) && freezeOnceVisible;
    var updateEntry = function (_a) {
        var entry = _a[0];
        setEntry(entry);
    };
    (0, react_1.useEffect)(function () {
        var node = ref === null || ref === void 0 ? void 0 : ref.current; // DOM Ref
        var hasIOSupport = !!window.IntersectionObserver;
        if (!hasIOSupport || frozen || !node)
            return;
        var observerParams = { threshold: threshold, root: root, rootMargin: rootMargin };
        var observer = new IntersectionObserver(updateEntry, observerParams);
        observer.observe(node);
        return function () { return observer.disconnect(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref === null || ref === void 0 ? void 0 : ref.current, JSON.stringify(threshold), root, rootMargin, frozen]);
    return [ref, entry];
}
exports.useIntersectionObserver = useIntersectionObserver;
