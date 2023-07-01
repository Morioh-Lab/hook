import { useEffect, useRef } from 'react';
export function usePopupWindow({ onClose, title = '_blank', w = 600, h = 500 }) {
    const timer = useRef();
    const open = (url) => {
        // Fixes dual-screen position                             Most browsers      Firefox
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft;
        const top = (height - h) / 2 / systemZoom + dualScreenTop;
        const windowPopup = window.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes,scrollbars=yes,width=${w / systemZoom}, height=${h / systemZoom},  top=${top}, left=${left}`);
        timer.current = setInterval(() => {
            if (windowPopup === null || windowPopup === void 0 ? void 0 : windowPopup.closed) {
                clearInterval(timer.current);
                if (onClose)
                    onClose();
            }
        }, 1000);
    };
    useEffect(() => {
        return () => clearInterval(timer.current);
    }, []);
    return { open };
}
