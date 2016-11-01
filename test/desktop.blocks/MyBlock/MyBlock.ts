import {decl} from 'snabbdom-bem'

export default decl({
    block : 'MyBlock',
    onClick(e) {
        this.__base.apply(this, arguments);
        console.log('other-level');
    }
});
