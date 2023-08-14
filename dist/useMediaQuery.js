"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediaQuery = void 0;
var react_1 = require("react");
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
function useMediaQuery(query) {
    var _a = (0, react_1.useState)(false), matches = _a[0], setMatches = _a[1];
    (0, react_1.useEffect)(function () {
        var matchMedia = window.matchMedia(query);
        var handler = function (event) {
            setMatches(event.matches);
        };
        // Triggered at the first client-side load and if query changes
        setMatches(matchMedia.matches);
        if (matchMedia.addListener) {
            matchMedia.addListener(handler);
        }
        else {
            matchMedia.addEventListener('change', handler);
        }
        return function () {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handler);
            }
            else {
                matchMedia.removeEventListener('change', handler);
            }
        };
    }, [query]);
    return matches;
}
exports.useMediaQuery = useMediaQuery;
