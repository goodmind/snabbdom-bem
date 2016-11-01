import {decl} from 'snabbdom-bem';
import MyBlock from 'b:MyBlock';

console.log('MyBlock', MyBlock)

export default decl(MyBlock, {
    block : 'MyDerivedBlock',
    cls : 'add-cls',
    onClick(e) {
        this.__base.apply(this, arguments);
        console.log(this.block);
    }
});
