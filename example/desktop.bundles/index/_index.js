/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/desktop.bundles/index/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var html = __webpack_require__(1).html;
	var snabbdom_1 = __webpack_require__(13);
	var b_Root_1 = [__webpack_require__(17)][0].default.applyDecls();
	var patch2 = snabbdom_1.init([__webpack_require__(41), __webpack_require__(42), __webpack_require__(43), __webpack_require__(44)]);
	var patch = patch2;
	patch(document.getElementById('root'), html(b_Root_1.default, null));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2)

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var decls_1 = __webpack_require__(3);
	var BaseComponent_1 = __webpack_require__(8);
	var ClassNameBuilder_1 = __webpack_require__(9);
	var simpleComponent_1 = __webpack_require__(11);
	var defaultNaming = new ClassNameBuilder_1.default({
	    elementSeparator: '-',
	    modSeparator: '_',
	    modValueSeparator: '_'
	});
	var defaultDecls = decls_1.default({}, BaseComponent_1.default, defaultNaming);
	exports.decl = defaultDecls.decl, exports.declMod = defaultDecls.declMod;
	var html_1 = __webpack_require__(12);
	exports.html = html_1.html;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = simpleComponent_1.default(defaultNaming);
	//# sourceMappingURL=index.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var inherit = __webpack_require__(4);
	var renderTag_1 = __webpack_require__(6);
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * node-inherit
	 * Copyright(c) 2011 Dmitry Filatov <dfilatov@yandex-team.ru>
	 * MIT Licensed
	 */

	module.exports = __webpack_require__(5);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @module inherit
	 * @version 2.2.6
	 * @author Filatov Dmitry <dfilatov@yandex-team.ru>
	 * @description This module provides some syntax sugar for "class" declarations, constructors, mixins, "super" calls and static members.
	 */

	(function(global) {

	var hasIntrospection = (function(){return '_';}).toString().indexOf('_') > -1,
	    emptyBase = function() {},
	    hasOwnProperty = Object.prototype.hasOwnProperty,
	    objCreate = Object.create || function(ptp) {
	        var inheritance = function() {};
	        inheritance.prototype = ptp;
	        return new inheritance();
	    },
	    objKeys = Object.keys || function(obj) {
	        var res = [];
	        for(var i in obj) {
	            hasOwnProperty.call(obj, i) && res.push(i);
	        }
	        return res;
	    },
	    extend = function(o1, o2) {
	        for(var i in o2) {
	            hasOwnProperty.call(o2, i) && (o1[i] = o2[i]);
	        }

	        return o1;
	    },
	    toStr = Object.prototype.toString,
	    isArray = Array.isArray || function(obj) {
	        return toStr.call(obj) === '[object Array]';
	    },
	    isFunction = function(obj) {
	        return toStr.call(obj) === '[object Function]';
	    },
	    noOp = function() {},
	    needCheckProps = true,
	    testPropObj = { toString : '' };

	for(var i in testPropObj) { // fucking ie hasn't toString, valueOf in for
	    testPropObj.hasOwnProperty(i) && (needCheckProps = false);
	}

	var specProps = needCheckProps? ['toString', 'valueOf'] : null;

	function getPropList(obj) {
	    var res = objKeys(obj);
	    if(needCheckProps) {
	        var specProp, i = 0;
	        while(specProp = specProps[i++]) {
	            obj.hasOwnProperty(specProp) && res.push(specProp);
	        }
	    }

	    return res;
	}

	function override(base, res, add) {
	    var addList = getPropList(add),
	        j = 0, len = addList.length,
	        name, prop;
	    while(j < len) {
	        if((name = addList[j++]) === '__self') {
	            continue;
	        }
	        prop = add[name];
	        if(isFunction(prop) &&
	                (!prop.prototype || !prop.prototype.__self) && // check to prevent wrapping of "class" functions
	                (!hasIntrospection || prop.toString().indexOf('.__base') > -1)) {
	            res[name] = (function(name, prop) {
	                var baseMethod = base[name]?
	                        base[name] :
	                        name === '__constructor'? // case of inheritance from plain function
	                            res.__self.__parent :
	                            noOp,
	                    result = function() {
	                        var baseSaved = this.__base;

	                        this.__base = result.__base;
	                        var res = prop.apply(this, arguments);
	                        this.__base = baseSaved;

	                        return res;
	                    };
	                result.__base = baseMethod;

	                return result;
	            })(name, prop);
	        } else {
	            res[name] = prop;
	        }
	    }
	}

	function applyMixins(mixins, res) {
	    var i = 1, mixin;
	    while(mixin = mixins[i++]) {
	        res?
	            isFunction(mixin)?
	                inherit.self(res, mixin.prototype, mixin) :
	                inherit.self(res, mixin) :
	            res = isFunction(mixin)?
	                inherit(mixins[0], mixin.prototype, mixin) :
	                inherit(mixins[0], mixin);
	    }
	    return res || mixins[0];
	}

	/**
	* Creates class
	* @exports
	* @param {Function|Array} [baseClass|baseClassAndMixins] class (or class and mixins) to inherit from
	* @param {Object} prototypeFields
	* @param {Object} [staticFields]
	* @returns {Function} class
	*/
	function inherit() {
	    var args = arguments,
	        withMixins = isArray(args[0]),
	        hasBase = withMixins || isFunction(args[0]),
	        base = hasBase? withMixins? applyMixins(args[0]) : args[0] : emptyBase,
	        props = args[hasBase? 1 : 0] || {},
	        staticProps = args[hasBase? 2 : 1],
	        res = props.__constructor || (hasBase && base.prototype && base.prototype.__constructor)?
	            function() {
	                return this.__constructor.apply(this, arguments);
	            } :
	            hasBase?
	                function() {
	                    return base.apply(this, arguments);
	                } :
	                function() {};

	    if(!hasBase) {
	        res.prototype = props;
	        res.prototype.__self = res.prototype.constructor = res;
	        return extend(res, staticProps);
	    }

	    extend(res, base);

	    res.__parent = base;

	    var basePtp = base.prototype,
	        resPtp = res.prototype = objCreate(basePtp);

	    resPtp.__self = resPtp.constructor = res;

	    props && override(basePtp, resPtp, props);
	    staticProps && override(base, res, staticProps);

	    return res;
	}

	inherit.self = function() {
	    var args = arguments,
	        withMixins = isArray(args[0]),
	        base = withMixins? applyMixins(args[0], args[0][0]) : args[0],
	        props = args[1],
	        staticProps = args[2],
	        basePtp = base.prototype;

	    props && override(basePtp, basePtp, props);
	    staticProps && override(base, base, staticProps);

	    return base;
	};

	var defineAsGlobal = true;
	if(true) {
	    module.exports = inherit;
	    defineAsGlobal = false;
	}

	if(typeof modules === 'object' && typeof modules.define === 'function') {
	    modules.define('inherit', function(provide) {
	        provide(inherit);
	    });
	    defineAsGlobal = false;
	}

	if(true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	        module.exports = inherit;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    defineAsGlobal = false;
	}

	defineAsGlobal && (global.inherit = inherit);

	})(this);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var html = __webpack_require__(7).html;
	function default_1(classNameBuilder) {
	    return function (Tag, attrs, block, elem, mods, mixes, cls, content, hooks) {
	        if (attrs === void 0) {
	            attrs = {};
	        }
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

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var SVGNS = 'http://www.w3.org/2000/svg';
	var modulesNS = ['hook', 'on', 'style', 'class', 'props', 'attrs'];
	var slice = Array.prototype.slice;

	function isPrimitive(val) {
	  return  typeof val === 'string'   ||
	          typeof val === 'number'   ||
	          typeof val === 'boolean'  ||
	          typeof val === 'symbol'   ||
	          val === null              ||
	          val === undefined;
	}

	function normalizeAttrs(attrs, nsURI, defNS, modules) {
	  var map = { ns: nsURI };
	  for (var i = 0, len = modules.length; i < len; i++) {
	    var mod = modules[i];
	    if(attrs[mod])
	      map[mod] = attrs[mod];
	  }
	  for(var key in attrs) {
	    if(key !== 'key' && key !== 'classNames' && key !== 'selector') {
	      var idx = key.indexOf('-');
	      if(idx > 0)
	        addAttr(key.slice(0, idx), key.slice(idx+1), attrs[key]);
	      else if(!map[key])
	        addAttr(defNS, key, attrs[key]);
	    }
	  }
	  return map;

	  function addAttr(namespace, key, val) {
	    var ns = map[namespace] || (map[namespace] = {});
	    ns[key] = val;
	  }
	}

	function buildFromStringTag(nsURI, defNS, modules, tag, attrs, children) {

	  if(attrs.selector) {
	    tag = tag + attrs.selector;
	  }
	  if(attrs.classNames) {
	    var cns = attrs.classNames;
	    tag = tag + '.' + (
	      Array.isArray(cns) ? cns.join('.') : cns.replace(/\s+/g, '.')
	    );
	  }

	  return {
	    sel       : tag,
	    data      : normalizeAttrs(attrs, nsURI, defNS, modules),
	    children  : children.map( function(c) {
	      return isPrimitive(c) ? {text: c} : c;
	    }),
	    key: attrs.key
	  };
	}

	function buildFromComponent(nsURI, defNS, modules, tag, attrs, children) {
	  var res;
	  if(typeof tag === 'function')
	    res = tag(attrs, children);
	  else if(tag && typeof tag.view === 'function')
	    res = tag.view(attrs, children);
	  else if(tag && typeof tag.render === 'function')
	    res = tag.render(attrs, children);
	  else
	    throw "JSX tag must be either a string, a function or an object with 'view' or 'render' methods";
	  res.key = attrs.key;
	  return res;
	}

	function flatten(nested, start, flat) {
	  for (var i = start, len = nested.length; i < len; i++) {
	    var item = nested[i];
	    if (Array.isArray(item)) {
	      flatten(item, 0, flat);
	    } else {
	      flat.push(item);
	    }
	  }
	}

	function maybeFlatten(array) {
	  if (array) {
	    for (var i = 0, len = array.length; i < len; i++) {
	      if (Array.isArray(array[i])) {
	        var flat = array.slice(0, i);
	        flatten(array, i, flat);
	        array = flat;
	        break;
	      }
	    }
	  }
	  return array;
	}

	function buildVnode(nsURI, defNS, modules, tag, attrs, children) {
	  attrs = attrs || {};
	  children = maybeFlatten(children);
	  if(typeof tag === 'string') {
	    return buildFromStringTag(nsURI, defNS, modules, tag, attrs, children)
	  } else {
	    return buildFromComponent(nsURI, defNS, modules, tag, attrs, children)
	  }
	}

	function JSX(nsURI, defNS, modules) {
	  return function jsxWithCustomNS(tag, attrs, children) {
	    if(arguments.length > 3 || !Array.isArray(children))
	      children = slice.call(arguments, 2);
	    return buildVnode(nsURI, defNS || 'props', modules || modulesNS, tag, attrs, children);
	  };
	}

	module.exports = {
	  html: JSX(undefined),
	  svg: JSX(SVGNS, 'attrs'),
	  JSX: JSX
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var inherit = __webpack_require__(4);
	var Component = inherit({
	    __constructor: function (props) {
	        this.props = props;
	        this.hooks = {
	            'hook-init': this.hookInit.bind(this),
	            'hook-insert': this.hookInsert.bind(this),
	            'hook-prepatch': this.hookPrepatch.bind(this),
	            'hook-update': this.hookUpdate.bind(this),
	            'hook-destroy': this.hookDestroy.bind(this)
	        };
	    },
	    hookInit: function () {
	        return;
	    },
	    hookInsert: function () {
	        return;
	    },
	    hookPrepatch: function () {
	        return;
	    },
	    hookUpdate: function () {
	        return;
	    },
	    hookDestroy: function () {
	        return;
	    }
	}, {});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = inherit(Component, {
	    __constructor: function () {
	        this.__base.apply(this, arguments);
	        this.willInit(this.props);
	    },
	    willInit: function () {
	        return;
	    },
	    tag: function () {
	        return 'div';
	    },
	    attrs: function () {
	        return null;
	    },
	    mods: function () {
	        return null;
	    },
	    cls: function () {
	        return '';
	    },
	    mix: function () {
	        return null;
	    },
	    render: function () {
	        var props = this.props;
	        var res = this.__render(this.tag(props), this.attrs(props), this.block, this.elem, this.mods(props), [props.mix, this.mix(props)], this.cls(props), this.content(props, props.children), this.hooks);
	        return this.wrap ? this.wrap(res) : res;
	    },
	    content: function (_, children) {
	        return children;
	    }
	});
	//# sourceMappingURL=BaseComponent.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var b_1 = __webpack_require__(10); // TODO: optimize?
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* global define: true */
	(/* istanbul ignore next */
	function (root, factory) {
	    'use strict';
	    if (true) {
	        // CommonJS
	        module.exports = factory();
	    } else if (typeof define === 'function' && define.amd) {
	        // AMD. Register as an anonymous module.
	        define([], factory);
	    } else {
	        // Browser globals
	        root.b_ = factory();
	    }
	})
	(this, function () {
	    /**
	     *
	     * @param {object} [options]
	     * @param {string} [options.tailSpace='']
	     * @param {string} [options.elementSeparator='__']
	     * @param {string} [options.modSeparator='_']
	     * @param {string} [options.modValueSeparator='_']
	     * @param {string} [options.classSeparator=' ']
	     * @param {string} [options.isFullModifier=true]
	     *
	     * @constructor
	     */
	    function BemFormatter(options) {
	        // Case call BemFormatter() without new
	        if (!(this instanceof  BemFormatter)) {
	            return createBemFormatter(options);
	        }

	        options = options || {};
	        this.tailSpace = options.tailSpace || '';
	        this.elementSeparator = options.elementSeparator || '__';
	        this.modSeparator = options.modSeparator || '_';
	        this.modValueSeparator = options.modValueSeparator || '_';
	        this.classSeparator = options.classSeparator || ' ';
	        this.isFullModifier = typeof options.isFullModifier === 'undefined' ? true : options.isFullModifier;
	    }

	    BemFormatter.prototype = {
	        /**
	         *
	         * @param {string} base
	         * @param {string} modifierKey
	         * @param {*} modifierValue
	         * @returns {string}
	         * @private
	         */
	        _stringifyModifier: function (base, modifierKey, modifierValue) {
	            var result = '';

	            // Ignore false or undefined values
	            if (modifierValue === false || typeof modifierValue === 'undefined') {
	                return result;
	            }

	            // Makes block__elem_{modifierKey}
	            result += this.classSeparator + base + this.modSeparator + modifierKey;

	            // If modifier value is just true skip `modifierValue`
	            if (modifierValue !== true) {
	                // Makes block__elem_{modifierKey}_{modifierValue}
	                result += this.modValueSeparator + String(modifierValue);
	            }

	            return result;
	        },

	        /**
	         *
	         * @param {string} base
	         * @param {object} modifiers
	         * @returns {string}
	         * @private
	         */
	        _stringifyModifiers: function (base, modifiers) {
	            var result = '';

	            if (!this.isFullModifier) {
	                base = '';
	            }

	            for (var modifierKey in modifiers) {
	                if (!modifiers.hasOwnProperty(modifierKey)) {
	                    continue;
	                }

	                result += this._stringifyModifier(base, modifierKey, modifiers[modifierKey]);
	            }

	            return result;
	        },

	        /**
	         *
	         * @param {string} block
	         * @param {string} [element]
	         * @param {object} [modifiers]
	         */
	        stringify: function (block, element, modifiers) {
	            var className = String(block);

	            // case b_(block, modifiers)
	            if (element && typeof element === 'object' && typeof modifiers === 'undefined') {
	                modifiers = element;
	                element = null;
	            }

	            if (element) {
	                className += this.elementSeparator + String(element);
	            }

	            if (modifiers) {
	                className += this._stringifyModifiers(className, modifiers);
	            }

	            return className + this.tailSpace;
	        }
	    };

	    /**
	     * Return partially applied b_
	     *
	     * @param {string} block
	     * @param {string} [element]
	     * @param {object} [modifiers]
	     * @returns {Function} partially applied b_
	     *
	     * @example
	     *
	     * ```jsx
	     * var B = require('b_');
	     * var b = B.with('b-button');
	     * var e = B.with('b-button', 'elem');
	     *
	     * function render() {
	         *   return (
	         *     <div className={b()}>
	         *       <span className={b('icon', {type: 'add'})}></span>
	         *       <span className={b('text')}></span>
	         *     </div>
	         *     <div className={b({size: 'small'})}>
	         *       <span className={b('icon', {type: 'add'})}></span>
	         *       <span className={b('text')}></span>
	         *     </div>
	         *   );
	         * }
	     * ```
	     */
	    function withMixin(block, element, modifiers) {
	        return this.bind.apply(this, [null].concat(Array.prototype.slice.call(arguments)));
	    }

	    /**
	     * @param {object} [options]
	     * @returns {function}
	     *
	     * @private
	     */
	    function createBemFormatter(options) {
	        var bemFormatter = new BemFormatter(options);

	        var b = bemFormatter.stringify.bind(bemFormatter);
	        b['with'] = b.lock = withMixin;

	        return b;
	    }

	    /**
	     *
	     * @type {function(this:BemFormatter)}
	     *
	     * @example
	     *
	     * var v = require('b_');
	     *
	     * b('block'); // 'block'
	     * b('block', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block block_mod1 block_mod3_mod3'
	     * b('block', 'elem'); // 'block__elem'
	     * b('block', 'elem', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block__elem block__elem_mod1 block__elem_mod3_mod3'
	     */
	    var b = createBemFormatter();

	    /**
	     *
	     * @type {BemFormatter}
	     *
	     * @example
	     *
	     * var b = new (require('b_').B)({
	     *   tailSpace: ' ',
	     *   elementSeparator: '-',
	     *   modSeparator: '--',
	     *   modValueSeparator: '-',
	     *   classSeparator: ' '
	     * });
	     *
	     * b.stringify('block'); // 'block '
	     * b.stringify('block', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block block--mod1 block--mod3-mod3 '
	     * b.stringify('block', 'elem'); // 'block-elem '
	     * b.stringify('block', 'elem', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block-elem block-elem--mod1 block-elem--mod3-mod3'
	     */
	    b.B = BemFormatter;

	    return b;
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var renderTag_1 = __webpack_require__(6);
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
	            children = _a.children,
	            hooks = _a.hooks;
	        var typeOfBlock = typeof block;
	        if (typeOfBlock === 'object') {
	            block = block.block;
	        } else if (typeOfBlock === 'function') {
	            block = block.prototype.block;
	        }
	        return _render(tag, attrs, block, elem, mods, mix, cls, children, hooks);
	    };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	//# sourceMappingURL=simpleComponent.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var snabbdom_jsx_1 = __webpack_require__(7);
	function isBemBlock(tag) {
	    return tag.__parent && tag.displayName;
	}
	function html(tag, attrs, children) {
	    var props = Object.assign({}, attrs, { children: children });
	    if (typeof tag === 'function' && isBemBlock(tag)) {
	        var f_1 = new tag(props);
	        return snabbdom_jsx_1.html(f_1.render ? f_1 : function () {
	            return f_1;
	        }, props, children);
	    }
	    return snabbdom_jsx_1.html(tag, props, children);
	}
	exports.html = html;
	//# sourceMappingURL=html.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Node */
	'use strict';

	var VNode = __webpack_require__(14);
	var is = __webpack_require__(15);
	var domApi = __webpack_require__(16);

	function isUndef(s) { return s === undefined; }
	function isDef(s) { return s !== undefined; }

	var emptyNode = VNode('', {}, [], undefined, undefined);

	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}

	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i, map = {}, key;
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}

	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

	function init(modules, api) {
	  var i, j, cbs = {};

	  if (isUndef(api)) api = domApi;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }

	  function emptyNodeAt(elm) {
	    var id = elm.id ? '#' + elm.id : '';
	    var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
	    return VNode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
	  }

	  function createRmCb(childElm, listeners) {
	    return function() {
	      if (--listeners === 0) {
	        var parent = api.parentNode(childElm);
	        api.removeChild(parent, childElm);
	      }
	    };
	  }

	  function createElm(vnode, insertedVnodeQueue) {
	    var i, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) {
	        i(vnode);
	        data = vnode.data;
	      }
	    }
	    var elm, children = vnode.children, sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
	                                                          : api.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        api.appendChild(elm, api.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
	      i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (i.create) i.create(emptyNode, vnode);
	        if (i.insert) insertedVnodeQueue.push(vnode);
	      }
	    } else {
	      elm = vnode.elm = api.createTextNode(vnode.text);
	    }
	    return vnode.elm;
	  }

	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }

	  function invokeDestroyHook(vnode) {
	    var i, j, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
	      if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	    }
	  }

	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var i, listeners, rm, ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.sel)) {
	          invokeDestroyHook(ch);
	          listeners = cbs.remove.length + 1;
	          rm = createRmCb(ch.elm, listeners);
	          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
	          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
	            i(ch, rm);
	          } else {
	            rm();
	          }
	        } else { // Text node
	          api.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }

	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0, newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        idxInOld = oldKeyToIdx[newStartVnode.key];
	        if (isUndef(idxInOld)) { // New element
	          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	          oldCh[idxInOld] = undefined;
	          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	    var i, hook;
	    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (!sameVnode(oldVnode, vnode)) {
	      var parentElm = api.parentNode(oldVnode.elm);
	      elm = createElm(vnode, insertedVnodeQueue);
	      api.insertBefore(parentElm, elm, oldVnode.elm);
	      removeVnodes(parentElm, [oldVnode], 0, 0);
	      return;
	    }
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
	      i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        api.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      api.setTextContent(elm, vnode.text);
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }

	  return function(oldVnode, vnode) {
	    var i, elm, parent;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

	    if (isUndef(oldVnode.sel)) {
	      oldVnode = emptyNodeAt(oldVnode);
	    }

	    if (sameVnode(oldVnode, vnode)) {
	      patchVnode(oldVnode, vnode, insertedVnodeQueue);
	    } else {
	      elm = oldVnode.elm;
	      parent = api.parentNode(elm);

	      createElm(vnode, insertedVnodeQueue);

	      if (parent !== null) {
	        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
	        removeVnodes(parent, [oldVnode], 0, 0);
	      }
	    }

	    for (i = 0; i < insertedVnodeQueue.length; ++i) {
	      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	    }
	    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
	    return vnode;
	  };
	}

	module.exports = {init: init};


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return {sel: sel, data: data, children: children,
	          text: text, elm: elm, key: key};
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = {
	  array: Array.isArray,
	  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	function createElement(tagName){
	  return document.createElement(tagName);
	}

	function createElementNS(namespaceURI, qualifiedName){
	  return document.createElementNS(namespaceURI, qualifiedName);
	}

	function createTextNode(text){
	  return document.createTextNode(text);
	}


	function insertBefore(parentNode, newNode, referenceNode){
	  parentNode.insertBefore(newNode, referenceNode);
	}


	function removeChild(node, child){
	  node.removeChild(child);
	}

	function appendChild(node, child){
	  node.appendChild(child);
	}

	function parentNode(node){
	  return node.parentElement;
	}

	function nextSibling(node){
	  return node.nextSibling;
	}

	function tagName(node){
	  return node.tagName;
	}

	function setTextContent(node, text){
	  node.textContent = text;
	}

	module.exports = {
	  createElement: createElement,
	  createElementNS: createElementNS,
	  createTextNode: createTextNode,
	  appendChild: appendChild,
	  removeChild: removeChild,
	  insertBefore: insertBefore,
	  parentNode: parentNode,
	  nextSibling: nextSibling,
	  tagName: tagName,
	  setTextContent: setTextContent
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var html = __webpack_require__(1).html;
	var snabbdom_bem_1 = __webpack_require__(1);
	var b_MyBlock_m_myMod_m_myModWithVal_valOne_1 = [__webpack_require__(18),__webpack_require__(19),__webpack_require__(20),__webpack_require__(24),__webpack_require__(26),__webpack_require__(27),__webpack_require__(29),__webpack_require__(30)][1].default.applyDecls();
	var b_MyDerivedBlock_1 = [__webpack_require__(31)][0].default.applyDecls();
	var b_OtherBlock_1 = [__webpack_require__(32)][0].default.applyDecls();
	var b_WrappedBlock_1 = [__webpack_require__(36)][0].default.applyDecls();
	[__webpack_require__(37),__webpack_require__(39)][0].default.applyDecls();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.decl({
	    block: 'Root',
	    willInit: function () {
	        this.state = { value: '567' };
	    },
	    content: function () {
	        var _this = this;
	        return [html(
	            b_MyBlock_m_myMod_m_myModWithVal_valOne_1.default,
	            { key: '1' },
	            html(
	                snabbdom_bem_1.default,
	                { block: 'InlineBlock', elem: 'Elem', mods: { a: 'b' }, mix: { block: 'YetAnBlock', elem: 'Yep' } },
	                'InlineBlock'
	            )
	        ), html(
	            b_MyBlock_m_myMod_m_myModWithVal_valOne_1.default,
	            { key: '2', disabled: true },
	            '321'
	        ), ' ', html(
	            b_MyBlock_m_myMod_m_myModWithVal_valOne_1.default,
	            { key: '3', myMod: true },
	            'myMod'
	        ), ' ', html(
	            b_MyBlock_m_myMod_m_myModWithVal_valOne_1.default,
	            { key: '4', myModWithVal: 'valOne' },
	            'myModWithVal valOne'
	        ), ' ', html(
	            b_MyDerivedBlock_1.default,
	            { key: '5' },
	            'MyDerivedBlock'
	        ), html(b_OtherBlock_1.default, { key: '6', value: this.state.value, mix: { block: 'OuterMixedBlock', elem: 'Elem' }, otherMod: true, onChange: function (_a) {
	                var target = _a.target;
	                console.log(_this);
	                _this.state.value = target.value;
	            } }), html(
	            snabbdom_bem_1.default,
	            { block: this, elem: 'RootElem', key: '6', mods: { a: 'b' } },
	            'RootElem'
	        ), html(
	            snabbdom_bem_1.default,
	            { block: this.__self, elem: 'OtherElem', key: '7' },
	            'OtherElem 1'
	        ), html(
	            snabbdom_bem_1.default,
	            { block: 'OtherBlock', elem: 'OtherElem', key: '8' },
	            'OtherElem 2'
	        ), html(
	            b_WrappedBlock_1.default,
	            { key: '9' },
	            'wrapped block'
	        )];
	    }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var snabbdom_bem_1 = __webpack_require__(1);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.decl({
	    block: 'MyBlock',
	    mods: function (_a) {
	        var disabled = _a.disabled;
	        return {
	            disabled: disabled,
	            a: true,
	            b: 1
	        };
	    },
	    tag: 'a',
	    attrs: function () {
	        return {
	            href: '//yandex.ru',
	            'on-click': this.onClick.bind(this)
	        };
	    },
	    onClick: function (e) {
	        e.preventDefault();
	        console.log('without myMod');
	    },
	    didMount: function () {
	        console.log(this.block + " is mounted");
	    }
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var snabbdom_bem_1 = __webpack_require__(1);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.decl({
	    block: 'MyBlock',
	    onClick: function (e) {
	        this.__base.apply(this, arguments);
	        console.log('other-level');
	    }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./MyBlock.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./MyBlock.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, "/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.\n   If a copy of the MPL was not distributed with this file,\n   You can obtain one at https://mozilla.org/MPL/2.0/. */\n\n.MyBlock\n{\n    color: #00f;\n}\n", ""]);

	// exports


/***/ },
/* 22 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(25);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./MyBlock.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./MyBlock.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, "/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.\n If a copy of the MPL was not distributed with this file,\n You can obtain one at https://mozilla.org/MPL/2.0/. */\n\n.MyBlock\n{\n    color: #f00;\n}\n", ""]);

	// exports


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var snabbdom_bem_1 = __webpack_require__(1);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.declMod(function (_a) {
	    var myMod = _a.myMod;
	    return myMod;
	}, {
	    block: 'MyBlock',
	    mods: function (_a) {
	        var myMod = _a.myMod;
	        return Object.assign(this.__base.apply(this, arguments), myMod);
	    },
	    onClick: function () {
	        this.__base.apply(this, arguments);
	        console.log('with myMod');
	    },
	    didMount: function () {
	        this.__base();
	        console.log(this.block + " with myMod is mounted");
	    }
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./MyBlock_myMod.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./MyBlock_myMod.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, "/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.\n If a copy of the MPL was not distributed with this file,\n You can obtain one at https://mozilla.org/MPL/2.0/. */\n\n.MyBlock_myMod\n{\n    color: #0f0;\n}\n", ""]);

	// exports


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var snabbdom_bem_1 = __webpack_require__(1);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.declMod(function (_a) {
	    var myModWithVal = _a.myModWithVal;
	    return myModWithVal;
	}, {
	    block: 'MyBlock',
	    mods: function (_a) {
	        var myModWithVal = _a.myModWithVal;
	        return Object.assign(this.__base.apply(this, arguments), myModWithVal);
	    }
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var snabbdom_bem_1 = __webpack_require__(1);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.declMod(function (_a) {
	    var myModWithVal = _a.myModWithVal;
	    return myModWithVal === 'valOne';
	}, {
	    block: 'MyBlock',
	    didMount: function () {
	        this.__base();
	        console.log(this.block + " with myModWithVal=valOne is mounted");
	    }
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var snabbdom_bem_1 = __webpack_require__(1);
	var b_MyBlock_1 = [__webpack_require__(18),__webpack_require__(19),__webpack_require__(20),__webpack_require__(24)][1].default.applyDecls();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.decl(b_MyBlock_1.default, {
	    block: 'MyDerivedBlock',
	    cls: 'add-cls',
	    onClick: function (e) {
	        this.__base.apply(this, arguments);
	        console.log(this.block);
	    }
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var snabbdom_bem_1 = __webpack_require__(1);
	[__webpack_require__(33),__webpack_require__(34)];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.decl({
	    block: 'OtherBlock',
	    tag: 'input',
	    mix: [{ block: 'YetAnotherBlock' }, { elem: 'elem' }],
	    mods: { otherMod: true },
	    attrs: function (_a) {
	        var value = _a.value,
	            onChange = _a.onChange;
	        return {
	            value: value,
	            'on-change': onChange
	        };
	    }
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var snabbdom_bem_1 = __webpack_require__(1);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.declMod(function (_a) {
	    var otherMod = _a.otherMod;
	    return otherMod;
	}, {
	    block: 'OtherBlock',
	    didMount: function () {
	        this.__base();
	        console.log(this.block + " with otherMod is mounted");
	    }
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./OtherBlock_otherMod.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./OtherBlock_otherMod.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, "/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.\n If a copy of the MPL was not distributed with this file,\n You can obtain one at https://mozilla.org/MPL/2.0/. */\n\n.OtherBlock_otherMod {\n    color: #f0f;\n}\n", ""]);

	// exports


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var html = __webpack_require__(1).html;
	var snabbdom_bem_1 = __webpack_require__(1);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.decl({
	    block: 'WrappedBlock',
	    wrap: function (wrappedBlock) {
	        return html(
	            snabbdom_bem_1.default,
	            { block: 'Wrapper' },
	            wrappedBlock
	        );
	    }
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var snabbdom_bem_1 = __webpack_require__(1);
	var b_MyBlock_e_MyElem_1 = [__webpack_require__(38)][0].default.applyDecls();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.decl({
	    block: 'OtherBlock',
	    elem: 'OtherElem',
	    content: function () {
	        return html(b_MyBlock_e_MyElem_1.default, null);
	    }
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	 If a copy of the MPL was not distributed with this file,
	 You can obtain one at https://mozilla.org/MPL/2.0/. */
	"use strict";

	var snabbdom_bem_1 = __webpack_require__(1);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = snabbdom_bem_1.decl({
	  block: 'MyBlock',
	  elem: 'MyElem'
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./OtherBlock-OtherElem.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./OtherBlock-OtherElem.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports


	// module
	exports.push([module.id, "/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.\n If a copy of the MPL was not distributed with this file,\n You can obtain one at https://mozilla.org/MPL/2.0/. */\n\n.OtherBlock-OtherElem {\n    color: #0ff;\n}\n", ""]);

	// exports


/***/ },
/* 41 */
/***/ function(module, exports) {

	function updateClass(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldClass = oldVnode.data.class,
	      klass = vnode.data.class;

	  if (!oldClass && !klass) return;
	  oldClass = oldClass || {};
	  klass = klass || {};

	  for (name in oldClass) {
	    if (!klass[name]) {
	      elm.classList.remove(name);
	    }
	  }
	  for (name in klass) {
	    cur = klass[name];
	    if (cur !== oldClass[name]) {
	      elm.classList[cur ? 'add' : 'remove'](name);
	    }
	  }
	}

	module.exports = {create: updateClass, update: updateClass};


/***/ },
/* 42 */
/***/ function(module, exports) {

	function updateProps(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldProps = oldVnode.data.props, props = vnode.data.props;

	  if (!oldProps && !props) return;
	  oldProps = oldProps || {};
	  props = props || {};

	  for (key in oldProps) {
	    if (!props[key]) {
	      delete elm[key];
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
	      elm[key] = cur;
	    }
	  }
	}

	module.exports = {create: updateProps, update: updateProps};


/***/ },
/* 43 */
/***/ function(module, exports) {

	var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
	var nextFrame = function(fn) { raf(function() { raf(fn); }); };

	function setNextFrame(obj, prop, val) {
	  nextFrame(function() { obj[prop] = val; });
	}

	function updateStyle(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldStyle = oldVnode.data.style,
	      style = vnode.data.style;

	  if (!oldStyle && !style) return;
	  oldStyle = oldStyle || {};
	  style = style || {};
	  var oldHasDel = 'delayed' in oldStyle;

	  for (name in oldStyle) {
	    if (!style[name]) {
	      elm.style[name] = '';
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (name === 'delayed') {
	      for (name in style.delayed) {
	        cur = style.delayed[name];
	        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
	          setNextFrame(elm.style, name, cur);
	        }
	      }
	    } else if (name !== 'remove' && cur !== oldStyle[name]) {
	      elm.style[name] = cur;
	    }
	  }
	}

	function applyDestroyStyle(vnode) {
	  var style, name, elm = vnode.elm, s = vnode.data.style;
	  if (!s || !(style = s.destroy)) return;
	  for (name in style) {
	    elm.style[name] = style[name];
	  }
	}

	function applyRemoveStyle(vnode, rm) {
	  var s = vnode.data.style;
	  if (!s || !s.remove) {
	    rm();
	    return;
	  }
	  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
	      compStyle, style = s.remove, amount = 0, applied = [];
	  for (name in style) {
	    applied.push(name);
	    elm.style[name] = style[name];
	  }
	  compStyle = getComputedStyle(elm);
	  var props = compStyle['transition-property'].split(', ');
	  for (; i < props.length; ++i) {
	    if(applied.indexOf(props[i]) !== -1) amount++;
	  }
	  elm.addEventListener('transitionend', function(ev) {
	    if (ev.target === elm) --amount;
	    if (amount === 0) rm();
	  });
	}

	module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};


/***/ },
/* 44 */
/***/ function(module, exports) {

	function invokeHandler(handler, vnode, event) {
	  if (typeof handler === "function") {
	    // call function handler
	    handler.call(vnode, event, vnode);
	  } else if (typeof handler === "object") {
	    // call handler with arguments
	    if (typeof handler[0] === "function") {
	      // special case for single argument for performance
	      if (handler.length === 2) {
	        handler[0].call(vnode, handler[1], event, vnode);
	      } else {
	        var args = handler.slice(1);
	        args.push(event);
	        args.push(vnode);
	        handler[0].apply(vnode, args);
	      }
	    } else {
	      // call multiple handlers
	      for (var i = 0; i < handler.length; i++) {
	        invokeHandler(handler[i]);
	      }
	    }
	  }
	}

	function handleEvent(event, vnode) {
	  var name = event.type,
	      on = vnode.data.on;

	  // call event handler(s) if exists
	  if (on && on[name]) {
	    invokeHandler(on[name], vnode, event);
	  }
	}

	function createListener() {
	  return function handler(event) {
	    handleEvent(event, handler.vnode);
	  }
	}

	function updateEventListeners(oldVnode, vnode) {
	  var oldOn = oldVnode.data.on,
	      oldListener = oldVnode.listener,
	      oldElm = oldVnode.elm,
	      on = vnode && vnode.data.on,
	      elm = vnode && vnode.elm,
	      name;

	  // optimization for reused immutable handlers
	  if (oldOn === on) {
	    return;
	  }

	  // remove existing listeners which no longer used
	  if (oldOn && oldListener) {
	    // if element changed or deleted we remove all existing listeners unconditionally
	    if (!on) {
	      for (name in oldOn) {
	        // remove listener if element was changed or existing listeners removed
	        oldElm.removeEventListener(name, oldListener, false);
	      }
	    } else {
	      for (name in oldOn) {
	        // remove listener if existing listener removed
	        if (!on[name]) {
	          oldElm.removeEventListener(name, oldListener, false);
	        }
	      }
	    }
	  }

	  // add new listeners which has not already attached
	  if (on) {
	    // reuse existing listener or create new
	    var listener = vnode.listener = oldVnode.listener || createListener();
	    // update vnode for listener
	    listener.vnode = vnode;

	    // if element changed or added we add all needed listeners unconditionally
	    if (!oldOn) {
	      for (name in on) {
	        // add listener if element was changed or new listeners added
	        elm.addEventListener(name, listener, false);
	      }
	    } else {
	      for (name in on) {
	        // add listener if new listener added
	        if (!oldOn[name]) {
	          elm.addEventListener(name, listener, false);
	        }
	      }
	    }
	  }
	}

	module.exports = {
	  create: updateEventListeners,
	  update: updateEventListeners,
	  destroy: updateEventListeners
	};


/***/ }
/******/ ]);