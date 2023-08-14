import { useEventListener } from './useEventListener';
import { isBrowser } from './helper';
const IS_MAC = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
const MODIFIERS = {
    alt: 'altKey',
    control: 'ctrlKey',
    meta: 'metaKey',
    shift: 'shiftKey',
};
/* istanbul ignore next */
const ALIASES = {
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
const CODES = Object.assign({ backspace: 8, tab: 9, enter: 13, shift: 16, control: 17, alt: 18, pause: 19, capslock: 20, escape: 27, ' ': 32, pageup: 33, pagedown: 34, end: 35, home: 36, arrowleft: 37, arrowup: 38, arrowright: 39, arrowdown: 40, insert: 45, delete: 46, meta: 91, numlock: 144, scrolllock: 145, ';': 186, '=': 187, ',': 188, '-': 189, '.': 190, '/': 191, '`': 192, '[': 219, '\\': 220, ']': 221, "'": 222 }, Array(20).reduce((acc, _, index) => {
    /* istanbul ignore next */
    acc[`f${index + 1}`] = 112 + index;
}, {}));
const createHotkey = (hotkeys, callback) => {
    hotkeys = Array.isArray(hotkeys) ? hotkeys : [hotkeys];
    const keys = [];
    let hasModifier = false;
    for (let i = 0; i < hotkeys.length; i++) {
        let key = String(hotkeys[i]).toLowerCase();
        key = ALIASES[key] || key;
        const modifier = MODIFIERS[key];
        hasModifier = hasModifier || !!modifier;
        keys.push({
            // Store the key for browsers that support event.key
            key,
            // Store the keyCode for browsers that don't support event.key
            which: CODES[key] || key.toUpperCase().charCodeAt(0),
            // Is this key is a modifier? If so, include it's real name
            // as defined in the event here
            modifier: modifier,
        });
    }
    return (event) => {
        // Event was stopped earlier in the chain
        /* istanbul ignore next */
        if (event.defaultPrevented)
            return;
        // Creates a list of modifiers defined in this event
        const eventModifiers = [];
        for (const modifier in MODIFIERS) {
            const mod = MODIFIERS[modifier];
            if (event[mod]) {
                // If the event had a modifier and there wasn't one specified, just bail
                if (!hasModifier)
                    return;
                eventModifiers.push(mod);
            }
        }
        for (let i = 0; i < keys.length; i++) {
            const expected = keys[i];
            if (expected.modifier) {
                // We expected this modifier and got it, continue
                const modIdx = eventModifiers.indexOf(expected.modifier);
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
                const actual = event.key.toLowerCase();
                // The key didn't match the expected key and this isn't a modifier,
                // so bail
                if (actual !== expected.key)
                    return;
            }
            else {
                // This browser is still using event.which
                const actual = event.which;
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
export function useHotkey(...args) {
    let target = isBrowser ? window : undefined;
    let hotkey;
    let callback;
    args.length >= 3 ? ([target, hotkey, callback] = args) : ([hotkey, callback] = args);
    return useHotkeys(target, [[hotkey, callback]]);
}
export function useHotkeys(target, hotkeys) {
    useEventListener(target, 'keydown', (event) => {
        for (const [hotkey, callback] of hotkeys) {
            createHotkey(hotkey, callback)(event);
        }
    });
}
