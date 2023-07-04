"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediaQuery = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
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
    var getMatches = function (query) {
        // Prevents SSR issues
        return helper_1.isBrowser ? window.matchMedia(query).matches : false;
    };
    var _a = (0, react_1.useState)(getMatches(query)), matches = _a[0], setMatches = _a[1];
    function handleChange() {
        setMatches(getMatches(query));
    }
    (0, react_1.useEffect)(function () {
        var matchMedia = window.matchMedia(query);
        // Triggered at the first client-side load and if query changes
        handleChange();
        // Listen matchMedia
        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        }
        else {
            matchMedia.addEventListener('change', handleChange);
        }
        return function () {
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
exports.useMediaQuery = useMediaQuery;
