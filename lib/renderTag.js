/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var html = require('snabbdom-jsx').html;
function default_1(classNameBuilder) {
    return function (Tag, attrs, block, elem, mods, mixes, cls, content, hooks) {
        if (attrs === void 0) {
            attrs = {};
        }
        console.log('hooks', hooks);
        return html(
            Tag,
            _extends({ className: classNameBuilder.stringify(block, elem, mods, classNameBuilder.joinMixes(mixes), cls) }, hooks, attrs),
            content
        );
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=renderTag.jsx.map