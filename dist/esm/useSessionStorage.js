import { useCallback, useEffect, useState } from 'react';
import { parseJSON, isBrowser } from './helper';
import { useEventCallback } from './useEventCallback';
import { useEventListener } from './useEventListener';
export function useSessionStorage(key, initialValue) {
    // Get from session storage then
    // parse stored json or return initialValue
    const readValue = useCallback(() => {
        // Prevent build error "window is undefined" but keep keep working
        if (!isBrowser) {
            return initialValue;
        }
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? parseJSON(item) : initialValue;
        }
        catch (error) {
            console.warn(`Error reading sessionStorage key “${key}”:`, error);
            return initialValue;
        }
    }, [initialValue, key]);
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(readValue);
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to sessionStorage.
    const setValue = useEventCallback((value) => {
        // Prevent build error "window is undefined" but keeps working
        if (!isBrowser) {
            console.warn(`Tried setting sessionStorage key “${key}” even though environment is not a client`);
        }
        try {
            // Allow value to be a function so we have the same API as useState
            const newValue = value instanceof Function ? value(storedValue) : value;
            // Save to session storage
            window.sessionStorage.setItem(key, JSON.stringify(newValue));
            // Save state
            setStoredValue(newValue);
            // We dispatch a custom event so every useSessionStorage hook are notified
            window.dispatchEvent(new Event('session-storage'));
        }
        catch (error) {
            console.warn(`Error setting sessionStorage key “${key}”:`, error);
        }
    });
    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleStorageChange = useCallback((event) => {
        if ((event === null || event === void 0 ? void 0 : event.key) && event.key !== key) {
            return;
        }
        setStoredValue(readValue());
    }, [key, readValue]);
    // this only works for other documents, not the current one
    useEventListener('storage', handleStorageChange);
    // this is a custom event, triggered in writeValueTosessionStorage
    // See: useSessionStorage()
    useEventListener('session-storage', handleStorageChange);
    return [storedValue, setValue];
}
