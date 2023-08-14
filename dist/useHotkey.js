"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHotkeys = exports.useHotkey = void 0;
var useEventListener_1 = require("./useEventListener");
var helper_1 = require("./helper");
var IS_MAC = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
var MODIFIERS = {
    alt: 'altKey',
    control: 'ctrlKey',
    meta: 'metaKey',
    shift: 'shiftKey',
};
/* istanbul ignore next */
var ALIASES = {
    break: 'pause',
    cmd: 'meta',
    command: 'meta',
    ctrl: 'control',
    del: 'delete',
    down: 'arrowdown',
    esc: 'escape',
    left: 'arrowleft',
    mod: IS_MAC ? 'meta' : 'control',
    option: 'alt',
    return: 'enter',
    right: 'arrowright',
    space: ' ',
    spacebar: ' ',
    up: 'arrowup',
    windows: 'meta',
};
var CODES = __assign({ backspace: 8, tab: 9, enter: 13, shift: 16, control: 17, alt: 18, pause: 19, capslock: 20, escape: 27, ' ': 32, pageup: 33, pagedown: 34, end: 35, home: 36, arrowleft: 37, arrowup: 38, arrowright: 39, arrowdown: 40, insert: 45, delete: 46, meta: 91, numlock: 144, scrolllock: 145, ';': 186, '=': 187, ',': 188, '-': 189, '.': 190, '/': 191, '`': 192, '[': 219, '\\': 220, ']': 221, "'": 222 }, Array(20).reduce(function (acc, _, index) {
    /* istanbul ignore next */
    acc["f".concat(index + 1)] = 112 + index;
}, {}));
var createHotkey = function (hotkeys, callback) {
    hotkeys = Array.isArray(hotkeys) ? hotkeys : [hotkeys];
    var keys = [];
    var hasModifier = false;
    for (var i = 0; i < hotkeys.length; i++) {
        var key = String(hotkeys[i]).toLowerCase();
        key = ALIASES[key] || key;
        var modifier = MODIFIERS[key];
        hasModifier = hasModifier || !!modifier;
        keys.push({
            // Store the key for browsers that support event.key
            key: key,
            // Store the keyCode for browsers that don't support event.key
            which: CODES[key] || key.toUpperCase().charCodeAt(0),
            // Is this key is a modifier? If so, include it's real name
            // as defined in the event here
            modifier: modifier,
        });
    }
    return function (event) {
        // Event was stopped earlier in the chain
        /* istanbul ignore next */
        if (event.defaultPrevented)
            return;
        // Creates a list of modifiers defined in this event
        var eventModifiers = [];
        for (var modifier in MODIFIERS) {
            var mod = MODIFIERS[modifier];
            if (event[mod]) {
                // If the event had a modifier and there wasn't one specified, just bail
                if (!hasModifier)
                    return;
                eventModifiers.push(mod);
            }
        }
        for (var i = 0; i < keys.length; i++) {
            var expected = keys[i];
            if (expected.modifier) {
                // We expected this modifier and got it, continue
                var modIdx = eventModifiers.indexOf(expected.modifier);
                if (modIdx > -1) {
                    eventModifiers.splice(modIdx, 1);
                    continue;
                }
                // We expected this modifier, but not this one so the key press isn't
                // valid. Thus, we bail.
                return;
            }
            if (event.key) {
                // This browser has event.key
                var actual = event.key.toLowerCase();
                // The key didn't match the expected key and this isn't a modifier,
                // so bail
                if (actual !== expected.key)
                    return;
            }
            else {
                // This browser is still using event.which
                var actual = event.which;
                // The key didn't match the expected key and this isn't a modifier,
                // so bail
                if (actual !== expected.which)
                    return;
            }
        }
        // There were modifiers in this keyboard event that weren't specified in
        // the hotkey
        if (eventModifiers.length)
            return;
        // Hey we did it, let the callback invoke
        callback(event);
    };
};
function useHotkey() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var target = helper_1.isBrowser ? window : undefined;
    var hotkey;
    var callback;
    args.length >= 3 ? (target = args[0], hotkey = args[1], callback = args[2], args) : (hotkey = args[0], callback = args[1], args);
    return useHotkeys(target, [[hotkey, callback]]);
}
exports.useHotkey = useHotkey;
function useHotkeys(target, hotkeys) {
    (0, useEventListener_1.useEventListener)(target, 'keydown', function (event) {
        for (var _i = 0, hotkeys_1 = hotkeys; _i < hotkeys_1.length; _i++) {
            var _a = hotkeys_1[_i], hotkey = _a[0], callback = _a[1];
            createHotkey(hotkey, callback)(event);
        }
    });
}
exports.useHotkeys = useHotkeys;
