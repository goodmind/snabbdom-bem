import {declMod} from 'snabbdom-bem';

export default declMod(({ myModWithVal }) => myModWithVal, {
    block : 'MyBlock',
    mods({ myModWithVal }) {
        debugger;
        return Object.assign(this.__base.apply(this, arguments), myModWithVal)
    }
});
