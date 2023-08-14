"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDetectAdBlock = void 0;
var react_1 = require("react");
var useDelay_1 = require("./useDelay");
// source: https://github.com/aruniverse/adblock-detect-react
function useDetectAdBlock(delay) {
    if (delay === void 0) { delay = 5000; }
    var _a = (0, react_1.useState)(false), adBlockDetected = _a[0], setAdBlockDetected = _a[1];
    var isDelayed = (0, useDelay_1.useDelay)(delay);
    (0, react_1.useEffect)(function () {
        if (isDelayed) {
            // grab a domain from https://github1s.com/gorhill/uBlock/blob/master/docs/tests/hostname-pool.js
            // https://pagead2.googlesyndication.com/pagead/show_ads.js
            fetch('https://www3.doubleclick.net', {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-store',
            })
                .then(function () { return setAdBlockDetected(false); })
                .catch(function () { return setAdBlockDetected(true); });
        }
    }, [isDelayed]);
    return adBlockDetected;
}
exports.useDetectAdBlock = useDetectAdBlock;
