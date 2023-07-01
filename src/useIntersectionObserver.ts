import { RefObject, useEffect, useRef, useState } from 'react';

interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({ threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }: Args) {
    const ref = useRef<Element | null>();
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    useEffect(() => {
        const node = ref?.current; // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref?.current, JSON.stringify(threshold), root, rootMargin, frozen]);

    return [ref, entry];
}
