var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "react-bem-helper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var BEMHelper = require("react-bem-helper");
    function withBEM(blockName, prefix, modifierDelimiter) {
        if (prefix === void 0) { prefix = ''; }
        if (modifierDelimiter === void 0) { modifierDelimiter = '--'; }
        var bemHelper = new BEMHelper({
            name: blockName,
            outputIsString: true,
            prefix: prefix,
            modifierDelimiter: modifierDelimiter
        });
        var bem = function (className) { return function (element, modifiers, mixins) {
            if (mixins === void 0) { mixins = []; }
            return bemHelper({
                element: element,
                modifiers: modifiers,
                extra: [className].concat(mixins)
            });
        }; };
        var cache = {};
        return function (Component) {
            return function (props) {
                var _a = props.className, className = _a === void 0 ? '' : _a;
                // Typescript lacks of support object rest for generics
                var other = Object.assign({}, props);
                delete other.className;
                if (cache.className !== className || !cache.bem) {
                    cache.className = className;
                    cache.bem = bem(className);
                }
                return (React.createElement(Component, __assign({ bem: cache.bem }, other)));
            };
        };
    }
    exports.default = withBEM;
});
