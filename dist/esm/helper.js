export const isBrowser = typeof window !== 'undefined'; // !!(typeof window !== 'undefined' && window.document && window.document.createElement);
export const isNavigator = typeof navigator !== 'undefined';
export const isObject = (value) => value !== null && typeof value === 'object';
export const isFunction = (value) => typeof value === 'function';
export const isString = (value) => typeof value === 'string';
export const isBoolean = (value) => typeof value === 'boolean';
export const isNumber = (value) => typeof value === 'number';
export const isUndef = (value) => typeof value === 'undefined';
// A wrapper for "JSON.parse()"" to support "undefined" value
export function parseJSON(value) {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value !== null && value !== void 0 ? value : '');
    }
    catch (_a) {
        console.log('parsing error on', { value });
        return undefined;
    }
}
// export function on<T extends Window | Document | HTMLElement | EventTarget>(obj: T | null, ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]): void {
//     if (obj && obj.addEventListener) {
//         obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
//     }
// }
// export function off<T extends Window | Document | HTMLElement | EventTarget>(obj: T | null, ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]): void {
//     if (obj && obj.removeEventListener) {
//         obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
//     }
// }
export function throttle(cb, ms) {
    let lastTime = 0;
    return () => {
        const now = Date.now();
        if (now - lastTime >= ms) {
            cb();
            lastTime = now;
        }
    };
}
// export function isTouchEvent({ nativeEvent: any }) {
//     return window.TouchEvent ? nativeEvent instanceof TouchEvent : 'touches' in nativeEvent;
// }
// export function isMouseEvent(event) {
//     return event.nativeEvent instanceof MouseEvent;
// }
