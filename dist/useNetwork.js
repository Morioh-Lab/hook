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
var react_1 = require("react");
var helper_1 = require("./helper");
var NetworkEventType;
(function (NetworkEventType) {
    NetworkEventType["ONLINE"] = "online";
    NetworkEventType["OFFLINE"] = "offline";
    NetworkEventType["CHANGE"] = "change";
})(NetworkEventType || (NetworkEventType = {}));
function getConnection() {
    var nav = navigator;
    if (!(0, helper_1.isObject)(nav))
        return null;
    return nav.connection || nav.mozConnection || nav.webkitConnection;
}
function getConnectionProperty() {
    var c = getConnection();
    if (!c)
        return {};
    return {
        rtt: c.rtt,
        type: c.type,
        saveData: c.saveData,
        downlink: c.downlink,
        downlinkMax: c.downlinkMax,
        effectiveType: c.effectiveType,
    };
}
function useNetwork() {
    var _a = (0, react_1.useState)(function () {
        return __assign({ since: undefined, online: navigator === null || navigator === void 0 ? void 0 : navigator.onLine }, getConnectionProperty());
    }), state = _a[0], setState = _a[1];
    var onOnline = function () {
        setState(function (prevState) { return (__assign(__assign({}, prevState), { online: true, since: new Date() })); });
    };
    var onOffline = function () {
        setState(function (prevState) { return (__assign(__assign({}, prevState), { online: false, since: new Date() })); });
    };
    addEventListener('online', onOnline);
    addEventListener('offline', onOffline);
    (0, react_1.useEffect)(function () {
        var onConnectionChange = function () {
            setState(function (prevState) { return (__assign(__assign({}, prevState), getConnectionProperty())); });
        };
        window.addEventListener(NetworkEventType.ONLINE, onOnline);
        window.addEventListener(NetworkEventType.OFFLINE, onOffline);
        var connection = getConnection();
        connection === null || connection === void 0 ? void 0 : connection.addEventListener(NetworkEventType.CHANGE, onConnectionChange);
        return function () {
            window.removeEventListener(NetworkEventType.ONLINE, onOnline);
            window.removeEventListener(NetworkEventType.OFFLINE, onOffline);
            connection === null || connection === void 0 ? void 0 : connection.removeEventListener(NetworkEventType.CHANGE, onConnectionChange);
        };
    }, []);
    return state;
}
exports.default = useNetwork;
