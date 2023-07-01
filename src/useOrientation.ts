import { useState } from 'react';
import { useEventListener } from './useEventListener';

// export function useOrientation() {
//     const [orientation, setOrientation] = useState({
//         angle: 0,
//         type: 'landscape-primary',
//     });

//     useIsomorphicLayoutEffect(() => {
//         const handleChange = () => {
//             const { angle, type } = window.screen.orientation;
//             setOrientation({
//                 angle,
//                 type,
//             });
//         };

//         const handle_orientationchange = () => {
//             setOrientation({
//                 type: 'UNKNOWN',
//                 angle: window.orientation,
//             });
//         };

//         if (window.screen?.orientation) {
//             handleChange();
//             window.screen.orientation.addEventListener('change', handleChange);
//         } else {
//             handle_orientationchange();
//             window.addEventListener('orientationchange', handle_orientationchange);
//         }

//         return () => {
//             if (window.screen?.orientation) {
//                 window.screen.orientation.removeEventListener('change', handleChange);
//             } else {
//                 window.removeEventListener('orientationchange', handle_orientationchange);
//             }
//         };
//     }, []);

//     return orientation;
// }

// export interface OrientationState {
//     angle: number;
//     type: string;
// }

// const defaultState: OrientationState = {
//     angle: 0,
//     type: 'landscape-primary',
// };

// export function useOrientation(initialState: OrientationState = defaultState) {
//     const [state, setState] = useState(initialState);

//     useEffect(() => {
//         const screen = window.screen;
//         let mounted = true;

//         const onChange = () => {
//             if (mounted) {
//                 const { orientation } = screen as any;

//                 if (orientation) {
//                     const { angle, type } = orientation;
//                     setState({ angle, type });
//                 } else if (window.orientation !== undefined) {
//                     setState({
//                         angle: typeof window.orientation === 'number' ? window.orientation : 0,
//                         type: '',
//                     });
//                 } else {
//                     setState(initialState);
//                 }
//             }
//         };

//         on(window, 'orientationchange', onChange);
//         onChange();

//         return () => {
//             mounted = false;
//             off(window, 'orientationchange', onChange);
//         };
//     }, []);

//     return state;
// }

export interface IOrientationState {
    angle: number;
    type: string;
}

export const defaultState: IOrientationState = {
    angle: 0,
    type: 'landscape-primary',
};

export function useOrientation(initialState: IOrientationState = defaultState) {
    const [state, setState] = useState(initialState);

    const onOrientationChangeEvent = () => {
        const { orientation } = screen as any;
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
