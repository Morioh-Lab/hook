import { useState } from 'react';
import { useEventListener } from './useEventListener';
export function useWindowFocused() {
    // get the initial state
    const [focus, setFocus] = useState(() => {
        return typeof document !== 'undefined' && document.hasFocus();
    });
    const onFocus = () => setFocus(true);
    const onBlur = () => setFocus(false);
    useEventListener('focus', onFocus);
    useEventListener('blur', onBlur);
    return focus;
}
