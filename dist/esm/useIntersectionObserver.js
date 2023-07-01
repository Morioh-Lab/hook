import { useEffect, useRef, useState } from 'react';
export function useIntersectionObserver({ threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }) {
    const ref = useRef();
    const [entry, setEntry] = useState();
    const frozen = (entry === null || entry === void 0 ? void 0 : entry.isIntersecting) && freezeOnceVisible;
    const updateEntry = ([entry]) => {
        setEntry(entry);
    };
    useEffect(() => {
        const node = ref === null || ref === void 0 ? void 0 : ref.current; // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver;
        if (!hasIOSupport || frozen || !node)
            return;
        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);
        observer.observe(node);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref === null || ref === void 0 ? void 0 : ref.current, JSON.stringify(threshold), root, rootMargin, frozen]);
    return [ref, entry];
}
