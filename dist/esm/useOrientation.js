import { useState } from 'react';
import { useEventListener } from './useEventListener';
export const defaultState = {
    angle: 0,
    type: 'landscape-primary',
};
export function useOrientation(initialState = defaultState) {
    const [state, setState] = useState(initialState);
    const onOrientationChangeEvent = () => {
        const { orientation } = screen;
        const { angle, type } = orientation;
        if (!orientation) {
            setState(initialState);
        }
        setState({ angle, type });
    };
    // useEffect(() => {
    //     window.addEventListener('orientationchange', onOrientationChangeEvent, true);
    //     return () => {
    //         window.addEventListener('orientationchange', onOrientationChangeEvent, true);
    //     };
    // }, []);
    useEventListener('orientationchange', onOrientationChangeEvent);
    return state;
}
