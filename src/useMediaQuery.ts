import { useEffect, useState } from 'react';
import { isBrowser } from './helper';

// export function useMediaQuery(query: string): boolean {
//     const subscribe = useCallback(
//         (callback: any) => {
//             const matchMedia = window.matchMedia(query);

//             matchMedia.addEventListener('change', callback);
//             return () => {
//                 matchMedia.removeEventListener('change', callback);
//             };
//         },
//         [query]
//     );

//     const getSnapshot = () => {
//         return window.matchMedia(query).matches;
//     };

//     const getServerSnapshot = () => {
//         throw Error('useMediaQuery is a client-only hook');
//     };

//     return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
// }

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(false);
    useEffect(() => {
        const matchMedia: MediaQueryList = window.matchMedia(query);

        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Triggered at the first client-side load and if query changes
        setMatches(matchMedia.matches);

        if (matchMedia.addListener) {
            matchMedia.addListener(handler);
        } else {
            matchMedia.addEventListener('change', handler);
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handler);
            } else {
                matchMedia.removeEventListener('change', handler);
            }
        };
    }, [query]);

    return matches;
}
