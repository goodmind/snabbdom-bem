"use strict";

var snabbdom_jsx_1 = require('snabbdom-jsx');
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