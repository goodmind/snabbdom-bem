/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */
"use strict";

var renderTag_1 = require('./renderTag');
function default_1(classNameBuilder) {
    var _render = renderTag_1.default(classNameBuilder);
    return function (_a) {
        var block = _a.block,
            elem = _a.elem,
            mods = _a.mods,
            _b = _a.tag,
            tag = _b === void 0 ? 'div' : _b,
            mix = _a.mix,
            attrs = _a.attrs,
            cls = _a.cls,
            children = _a.children;
        var typeOfBlock = typeof block;
        if (typeOfBlock === 'object') {
            block = block.block;
        } else if (typeOfBlock === 'function') {
            block = block.prototype.block;
        }
        return _render(tag, attrs, block, elem, mods, mix, cls, children);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=simpleComponent.js.map