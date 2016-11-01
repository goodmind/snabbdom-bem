"use strict";

var b_1 = require('b_'); // TODO: optimize?
var ClassNameBuilder = function () {
    function ClassNameBuilder(options) {
        this.b = b_1.B(options);
    }
    ClassNameBuilder.prototype.stringify = function (block, elem, mods, mixes, cls) {
        var _this = this;
        return this.b(block, elem, mods) + (mixes ? ' ' + mixes.map(function (mix) {
            return _this.b(mix.block || block, mix.elem, mix.mods);
        }).join(' ') : '') + (cls ? ' ' + cls : '');
    };
    ClassNameBuilder.prototype.joinMixes = function (mix1, mix2) {
        if (Array.isArray(mix1)) {
            mix2 = mix1[1];
            mix1 = mix1[0];
        }
        if (!mix1 && !mix2) {
            return undefined;
        }
        var mixes = [];
        if (mix1) {
            mixes = mixes.concat(mix1);
        }
        if (mix2) {
            mixes = mixes.concat(mix2);
        }
        return mixes;
    };
    return ClassNameBuilder;
}();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClassNameBuilder;
//# sourceMappingURL=ClassNameBuilder.js.map