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


// import React, { useState, useEffect } from 'react'
// import _ from 'lodash'

// export default function useIsWindowFocused(): boolean {
//     const [windowIsActive, setWindowIsActive] = useState(true)

//     const handleActivity = React.useCallback(
//         _.debounce(
//             (e: { type: string }) => {
//                 if (e?.type == 'focus') {
//                     return setWindowIsActive(true)
//                 }
//                 if (e?.type == 'blur') {
//                     return setWindowIsActive(false)
//                 }
//                 if (e?.type == 'visibilitychange') {
//                     if (document.hidden) {
//                         return setWindowIsActive(false)
//                     } else {
//                         return setWindowIsActive(true)
//                     }
//                 }
//             },
//             100,
//             { leading: false },
//         ),
//         [],
//     )

//     useEffect(() => {
//         document.addEventListener('visibilitychange', handleActivity)
//         document.addEventListener('blur', handleActivity)
//         window.addEventListener('blur', handleActivity)
//         window.addEventListener('focus', handleActivity)
//         document.addEventListener('focus', handleActivity)

//         return () => {
//             window.removeEventListener('blur', handleActivity)
//             document.removeEventListener('blur', handleActivity)
//             window.removeEventListener('focus', handleActivity)
//             document.removeEventListener('focus', handleActivity)
//             document.removeEventListener('visibilitychange', handleActivity)
//         }
//     }, [])

//     return windowIsActive
// }