"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
var react_1 = require("react");
var useEventCallback_1 = require("./useEventCallback");
var useEventListener_1 = require("./useEventListener");
var helper_1 = require("./helper");
function useLocalStorage(key, initialValue) {
    // Get from local storage then
    // parse stored json or return initialValue
    var readValue = (0, react_1.useCallback)(function () {
        // Prevent build error "window is undefined" but keeps working
        if (!helper_1.isBrowser) {
            return initialValue;
        }
        try {
            var item = window.localStorage.getItem(key);
            return item ? (0, helper_1.parseJSON)(item) : initialValue;
        }
        catch (error) {
            console.warn("Error reading localStorage key \u201C".concat(key, "\u201D:"), error);
            return initialValue;
        }
    }, [initialValue, key]);
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    var _a = (0, react_1.useState)(readValue), storedValue = _a[0], setStoredValue = _a[1];
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    var setValue = (0, useEventCallback_1.useEventCallback)(function (value) {
        // Prevent build error "window is undefined" but keeps working
        if (!helper_1.isBrowser) {
            console.warn("Tried setting localStorage key \u201C".concat(key, "\u201D even though environment is not a client"));
        }
        try {
            // Allow value to be a function so we have the same API as useState
            var newValue = value instanceof Function ? value(storedValue) : value;
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(newValue));
            // Save state
            setStoredValue(newValue);
            // We dispatch a custom event so every useLocalStorage hook are notified
            window.dispatchEvent(new Event('local-storage'));
        }
        catch (error) {
            console.warn("Error setting localStorage key \u201C".concat(key, "\u201D:"), error);
        }
    });
    (0, react_1.useEffect)(function () {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var handleStorageChange = (0, react_1.useCallback)(function (event) {
        if ((event === null || event === void 0 ? void 0 : event.key) && event.key !== key) {
            return;
        }
        setStoredValue(readValue());
    }, [key, readValue]);
    // this only works for other documents, not the current one
    (0, useEventListener_1.useEventListener)('storage', handleStorageChange);
    // this is a custom event, triggered in writeValueToLocalStorage
    // See: useLocalStorage()
    (0, useEventListener_1.useEventListener)('local-storage', handleStorageChange);
    return [storedValue, setValue];
}
exports.useLocalStorage = useLocalStorage;
