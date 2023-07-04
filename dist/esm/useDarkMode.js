import { useLocalStorage } from './useLocalStorage';
import { useMediaQuery } from './useMediaQuery';
const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
export function useDarkMode(defaultValue) {
    var _a;
    const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
    const [isDarkMode, setDarkMode] = useLocalStorage('dark-mode', (_a = defaultValue !== null && defaultValue !== void 0 ? defaultValue : isDarkOS) !== null && _a !== void 0 ? _a : false);
    // // Update darkMode if os prefers changes
    // useEffect(() => {
    //     setDarkMode(isDarkOS);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isDarkOS]);
    return {
        isDarkMode,
        toggle: () => setDarkMode((prev) => !prev),
        enable: () => setDarkMode(true),
        disable: () => setDarkMode(false),
    };
}
