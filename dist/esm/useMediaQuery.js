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
export function useMediaQuery(query) {
    const getMatches = (query) => {
        // Prevents SSR issues
        return isBrowser ? window.matchMedia(query).matches : false;
    };
    const [matches, setMatches] = useState(getMatches(query));
    function handleChange() {
        setMatches(getMatches(query));
    }
    useEffect(() => {
        const matchMedia = window.matchMedia(query);
        // Triggered at the first client-side load and if query changes
        handleChange();
        // Listen matchMedia
        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        }
        else {
            matchMedia.addEventListener('change', handleChange);
        }
        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange);
            }
            else {
                matchMedia.removeEventListener('change', handleChange);
            }
        };
    }, [query]);
    return matches;
}
