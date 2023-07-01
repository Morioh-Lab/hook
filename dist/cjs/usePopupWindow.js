"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePopupWindow = void 0;
var react_1 = require("react");
function usePopupWindow(_a) {
    var onClose = _a.onClose, _b = _a.title, title = _b === void 0 ? '_blank' : _b, _c = _a.w, w = _c === void 0 ? 600 : _c, _d = _a.h, h = _d === void 0 ? 500 : _d;
    var timer = (0, react_1.useRef)();
    var open = function (url) {
        // Fixes dual-screen position                             Most browsers      Firefox
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var systemZoom = width / window.screen.availWidth;
        var left = (width - w) / 2 / systemZoom + dualScreenLeft;
        var top = (height - h) / 2 / systemZoom + dualScreenTop;
        var windowPopup = window.open(url, title, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes,scrollbars=yes,width=".concat(w / systemZoom, ", height=").concat(h / systemZoom, ",  top=").concat(top, ", left=").concat(left));
        timer.current = setInterval(function () {
            if (windowPopup === null || windowPopup === void 0 ? void 0 : windowPopup.closed) {
                clearInterval(timer.current);
                if (onClose)
                    onClose();
            }
        }, 1000);
    };
    (0, react_1.useEffect)(function () {
        return function () { return clearInterval(timer.current); };
    }, []);
    return { open: open };
}
exports.usePopupWindow = usePopupWindow;
