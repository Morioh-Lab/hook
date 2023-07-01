"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediaQuery = void 0;
var react_1 = require("react");
function useMediaQuery(query) {
    var subscribe = (0, react_1.useCallback)(function (callback) {
        var matchMedia = window.matchMedia(query);
        matchMedia.addEventListener('change', callback);
        return function () {
            matchMedia.removeEventListener('change', callback);
        };
    }, [query]);
    var getSnapshot = function () {
        return window.matchMedia(query).matches;
    };
    var getServerSnapshot = function () {
        throw Error('useMediaQuery is a client-only hook');
    };
    return (0, react_1.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
exports.useMediaQuery = useMediaQuery;
