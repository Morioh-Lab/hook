import { useCallback } from 'react';

export function useVibration(value = 200) {
    return useCallback(() => {
        navigator.vibrate(value);
    }, [value]);
}
