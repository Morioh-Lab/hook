import { useEffect, useState } from 'react';
import { useDelay } from './useDelay';
// source: https://github.com/aruniverse/adblock-detect-react
export function useDetectAdBlock(delay = 5000) {
    const [adBlockDetected, setAdBlockDetected] = useState(false);
    const isDelayed = useDelay(delay);
    useEffect(() => {
        if (isDelayed) {
            // grab a domain from https://github1s.com/gorhill/uBlock/blob/master/docs/tests/hostname-pool.js
            fetch('https://www3.doubleclick.net', {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-store',
            }).catch(() => setAdBlockDetected(true));
        }
    }, [isDelayed]);
    return adBlockDetected;
}
