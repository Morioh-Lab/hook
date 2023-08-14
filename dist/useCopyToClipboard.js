"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCopyToClipboard = void 0;
var react_1 = require("react");
function useCopyToClipboard(_a) {
    var _b = _a.timeout, timeout = _b === void 0 ? 3000 : _b;
    var _c = (0, react_1.useState)(false), copied = _c[0], setCopied = _c[1];
    var toClipboard = (0, react_1.useCallback)(function (text) {
        return copyToClipboard(text)
            .then(function () { return setCopied(true); })
            .catch(function () { return setCopied(function (copied) { return copied; }); });
    }, [timeout]);
    (0, react_1.useEffect)(function () {
        if (!copied || timeout <= 0)
            return;
        var reset = setTimeout(function () { return setCopied(false); }, timeout);
        return function () { return clearTimeout(reset); };
    }, [copied, timeout]);
    return [copied, toClipboard];
}
exports.useCopyToClipboard = useCopyToClipboard;
/* istanbul ignore next */
function copyToClipboard(text) {
    // uses the Async Clipboard API when available. Requires a secure browing
    // context (i.e. HTTPS)
    if (navigator.clipboard)
        return navigator.clipboard.writeText(text);
    // puts the text to copy into a <span>
    var span = document.createElement('span');
    span.textContent = text;
    // preserves consecutive spaces and newlines
    span.style.whiteSpace = 'pre';
    // adds the <span> to the page
    document.body.appendChild(span);
    // makes a selection object representing the range of text selected by the user
    var selection = window.getSelection();
    if (!selection)
        return Promise.reject();
    var range = window.document.createRange();
    selection.removeAllRanges();
    range.selectNode(span);
    selection.addRange(range);
    // copies text to the clipboard
    try {
        window.document.execCommand('copy');
    }
    catch (err) {
        return Promise.reject();
    }
    // cleans up the dom element and selection
    selection.removeAllRanges();
    window.document.body.removeChild(span);
    // the Async Clipboard API returns a promise that may reject with `undefined`
    // so we match that here for consistency
    return Promise.resolve();
}
