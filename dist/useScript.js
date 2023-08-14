"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScript = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
function useScript(src, attrs) {
    if (attrs === void 0) { attrs = {}; }
    var _a = (0, react_1.useState)(function () {
        if (!src) {
            return 'idle';
        }
        return 'loading';
    }), status = _a[0], setStatus = _a[1];
    var cached = (0, react_1.useRef)({});
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (!src || !helper_1.isBrowser) {
            return;
        }
        var cachedScriptStatus = cached.current[src];
        if (cachedScriptStatus === 'ready' || cachedScriptStatus === 'error') {
            setStatus(cachedScriptStatus);
            return;
        }
        var script = document.querySelector("script[src=\"".concat(src, "\"]"));
        if (script) {
            setStatus((_b = (_a = script.getAttribute('data-status')) !== null && _a !== void 0 ? _a : cachedScriptStatus) !== null && _b !== void 0 ? _b : 'loading');
        }
        else {
            script = document.createElement('script');
            script.setAttribute('src', src);
            script.setAttribute('data-status', 'loading');
            Object.keys(attrs).forEach(function (key) {
                if (!(script === null || script === void 0 ? void 0 : script.getAttribute(key))) {
                    script === null || script === void 0 ? void 0 : script.setAttribute(key, attrs[key]);
                }
            });
            document.body.appendChild(script);
            var setAttributeFromEvent = function (event) {
                var scriptStatus = event.type === 'load' ? 'ready' : 'error';
                if (script) {
                    script.setAttribute('data-status', scriptStatus);
                }
            };
            script.addEventListener('load', setAttributeFromEvent);
            script.addEventListener('error', setAttributeFromEvent);
            // useEventListener(script, 'load', setAttributeFromEvent);
            // useEventListener(script, 'error', setAttributeFromEvent);
        }
        var setStateFromEvent = function (event) {
            var newStatus = event.type === 'load' ? 'ready' : 'error';
            setStatus(newStatus);
            cached.current[src] = newStatus;
        };
        // useEventListener(script, 'load', setStateFromEvent);
        // useEventListener(script, 'error', setStateFromEvent);
        script.addEventListener('load', setStateFromEvent);
        script.addEventListener('error', setStateFromEvent);
        return function () {
            if (script) {
                script.removeEventListener('load', setStateFromEvent);
                script.removeEventListener('error', setStateFromEvent);
            }
        };
    }, [src]);
    return status;
}
exports.useScript = useScript;
