"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.parseJSON = exports.isUndef = exports.isNumber = exports.isBoolean = exports.isString = exports.isFunction = exports.isObject = exports.isNavigator = exports.isBrowser = void 0;
exports.isBrowser = typeof window !== 'undefined'; // !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.isNavigator = typeof navigator !== 'undefined';
var isObject = function (value) { return value !== null && typeof value === 'object'; };
exports.isObject = isObject;
var isFunction = function (value) { return typeof value === 'function'; };
exports.isFunction = isFunction;
var isString = function (value) { return typeof value === 'string'; };
exports.isString = isString;
var isBoolean = function (value) { return typeof value === 'boolean'; };
exports.isBoolean = isBoolean;
var isNumber = function (value) { return typeof value === 'number'; };
exports.isNumber = isNumber;
var isUndef = function (value) { return typeof value === 'undefined'; };
exports.isUndef = isUndef;
// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON(value) {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value !== null && value !== void 0 ? value : '');
    }
    catch (_a) {
        console.log('parsing error on', { value: value });
        return undefined;
    }
}
exports.parseJSON = parseJSON;
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
function throttle(cb, ms) {
    var lastTime = 0;
    return function () {
        var now = Date.now();
        if (now - lastTime >= ms) {
            cb();
            lastTime = now;
        }
    };
}
exports.throttle = throttle;
// export function isTouchEvent({ nativeEvent: any }) {
//     return window.TouchEvent ? nativeEvent instanceof TouchEvent : 'touches' in nativeEvent;
// }
// export function isMouseEvent(event) {
//     return event.nativeEvent instanceof MouseEvent;
// }
