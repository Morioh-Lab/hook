"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDarkMode = void 0;
var react_1 = require("react");
var useLocalStorage_1 = require("./useLocalStorage");
var useMediaQuery_1 = require("./useMediaQuery");
var COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
function useDarkMode(defaultValue) {
    var _a;
    var isDarkOS = (0, useMediaQuery_1.useMediaQuery)(COLOR_SCHEME_QUERY);
    var _b = (0, useLocalStorage_1.useLocalStorage)('dark-mode', (_a = defaultValue !== null && defaultValue !== void 0 ? defaultValue : isDarkOS) !== null && _a !== void 0 ? _a : false), isDarkMode = _b[0], setDarkMode = _b[1];
    // Update darkMode if os prefers changes
    (0, react_1.useEffect)(function () {
        setDarkMode(isDarkOS);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDarkOS]);
    return {
        isDarkMode: isDarkMode,
        toggle: function () { return setDarkMode(function (prev) { return !prev; }); },
        enable: function () { return setDarkMode(true); },
        disable: function () { return setDarkMode(false); },
    };
}
exports.useDarkMode = useDarkMode;
