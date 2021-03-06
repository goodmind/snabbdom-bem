/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */
"use strict";

var decls_1 = require('./decls');
var BaseComponent_1 = require('./BaseComponent');
var ClassNameBuilder_1 = require('./ClassNameBuilder');
var simpleComponent_1 = require('./simpleComponent');
var defaultNaming = new ClassNameBuilder_1.default({
    elementSeparator: '-',
    modSeparator: '_',
    modValueSeparator: '_'
});
var defaultDecls = decls_1.default({}, BaseComponent_1.default, defaultNaming);
exports.decl = defaultDecls.decl, exports.declMod = defaultDecls.declMod;
var html_1 = require('./html');
exports.html = html_1.html;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = simpleComponent_1.default(defaultNaming);
//# sourceMappingURL=index.js.map