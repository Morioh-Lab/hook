"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var helper_1 = require("./helper");
var useIsomorphicLayoutEffect = helper_1.isBrowser ? react_1.useLayoutEffect : react_1.useEffect;
exports.default = useIsomorphicLayoutEffect;
