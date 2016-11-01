"use strict";

var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var inherit = require('inherit');
var Component = function (_super) {
    __extends(Component, _super);
    function Component(props) {
        _super.call(this);
        this.props = props;
    }
    return Component;
}(Object);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = inherit(Component, {
    __constructor: function () {
        this.__base.apply(this, arguments);
        this.willInit(this.props);
    },
    willInit: function () {},
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
    render: function (_props, _children) {
        var props = this.props;
        var res = this.__render(this.tag(props), this.attrs(props), this.block, this.elem, this.mods(props), [props.mix, this.mix(props)], this.cls(props), this.content(props, props.children));
        return this.wrap ? this.wrap(res) : res;
    },
    content: function (_, children) {
        return children;
    }
});
//# sourceMappingURL=BaseComponent.js.map