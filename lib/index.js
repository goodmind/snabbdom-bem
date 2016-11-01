"use strict";

var decls_1 = require('./decls');
var BaseComponent_1 = require('./BaseComponent');
var ClassNameBuilder_1 = require('./ClassNameBuilder');
var simpleComponent_1 = require('./simpleComponent');
var defaultNaming = new ClassNameBuilder_1.default({
    elementSeparator: '-',
    modSeparator: '_',
    modValueSeparator: '_'
}),
    defaultDecls = decls_1.default({}, BaseComponent_1.default, defaultNaming);
exports.decl = defaultDecls.decl, exports.declMod = defaultDecls.declMod;
var html_1 = require('./html');
exports.html = html_1.html;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = simpleComponent_1.default(defaultNaming);
//# sourceMappingURL=index.js.map