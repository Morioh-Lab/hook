import { useState } from 'react';
import { useTimeout } from './useTimeout';

export function useDelay(delay: number | null) {
    const [state, setState] = useState(false);
    useTimeout(() => setState(true), delay);
    return state;
}
