/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */
"use strict";

var inherit = require('inherit');
var renderTag_1 = require('./renderTag');
function bemReactCore(options, BaseComponent, classNameBuilder) {
    var entities = {};
    BaseComponent.prototype.__render = renderTag_1.default(classNameBuilder);
    function applyEntityDecls() {
        var entity = this;
        if (entity.decls) {
            entity.decls.forEach(function (_a) {
                var fields = _a.fields,
                    staticFields = _a.staticFields;
                entity.cls ? inherit.self(entity.cls, fields, staticFields) : entity.cls = inherit(entity.base ? entity.base : BaseComponent, fields, Object.assign({ displayName: classNameBuilder.stringify(fields.block, fields.elem) }, staticFields));
            });
            entity.decls = null;
        }
        if (entity.modDecls) {
            var ptp_1 = entity.cls.prototype;
            entity.modDecls.forEach(function (_a) {
                var predicate = _a.predicate,
                    fields = _a.fields,
                    staticFields = _a.staticFields;
                var _loop_1 = function (name_1) {
                    var field = fields[name_1];
                    if (typeof field === 'function') {
                        fields[name_1] = function () {
                            var method;
                            if (predicate.call(this, this.props)) {
                                method = field;
                            } else {
                                var baseMethod = ptp_1[name_1];
                                if (baseMethod && baseMethod !== field) {
                                    method = this.__base;
                                }
                            }
                            return method && method.apply(this, arguments);
                        };
                    }
                };
                for (var name_1 in fields) {
                    _loop_1(name_1);
                }
                inherit.self(entity.cls, fields, staticFields);
            });
            entity.modDecls = null;
        }
        return { 'default': entity.cls };
    }
    function getEntity(key) {
        return entities[key] || (entities[key] = {
            cls: null,
            base: null,
            decls: null,
            modDecls: null,
            applyDecls: applyEntityDecls
        });
    }
    return {
        decl: function (base, fields, staticFields) {
            if (typeof base !== 'function') {
                staticFields = fields;
                fields = base;
                base = undefined;
            }
            fixHooks(wrapBemFields(fields));
            var key = classNameBuilder.stringify(fields.block, fields.elem);
            var entity = getEntity(key);
            if (base) {
                if (entity.base) {
                    throw new Error("BEM-entity \"" + key + "\" has multiple ancestors");
                }
                entity.base = base;
            }
            entity.decls = entity.decls || [];
            entity.decls.push({ fields: fields, staticFields: staticFields });
            return entity;
        },
        declMod: function (predicate, fields, staticFields) {
            fixHooks(wrapBemFields(fields));
            var entity = getEntity(classNameBuilder.stringify(fields.block, fields.elem));
            entity.modDecls = entity.modDecls || [];
            entity.modDecls.push({ predicate: predicate, fields: fields, staticFields: staticFields });
            return entity;
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bemReactCore;
function wrapWithFunction(obj, name) {
    if (Array.isArray(name)) {
        name.forEach(function (n) {
            return wrapWithFunction(obj, n);
        });
    } else {
        if (obj.hasOwnProperty(name)) {
            var val_1 = obj[name];
            if (typeof val_1 !== 'function') {
                obj[name] = function () {
                    return val_1;
                };
            }
        }
    }
    return obj;
}
function wrapBemFields(obj) {
    return wrapWithFunction(obj, ['tag', 'attrs', 'content', 'mods', 'mix', 'cls']);
}
var lifecycleHooks = {
    willMount: 'hookInit',
    didMount: 'hookInsert',
    willReceiveProps: 'componentWillReceiveProps',
    shouldUpdate: 'shouldComponentUpdate',
    willUpdate: 'hookPrepatch',
    didUpdate: 'hookUpdate',
    willUnmount: 'hookDestroy'
};
function fixHooks(obj) {
    for (var oldName in lifecycleHooks) {
        if (obj[oldName]) {
            obj[lifecycleHooks[oldName]] = obj[oldName];
            delete obj[oldName];
        }
    }
    return obj;
}
//# sourceMappingURL=decls.js.map