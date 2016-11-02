/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */
"use strict";

var inherit = require('inherit');
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