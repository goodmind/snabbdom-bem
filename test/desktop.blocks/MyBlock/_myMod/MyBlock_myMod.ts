import {declMod} from 'snabbdom-bem';

export default declMod(({ myMod }) => myMod, {
    block : 'MyBlock',
    mods({ myMod }) {
        return Object.assign(this.__base.apply(this, arguments), myMod)
    },
    onClick() {
        this.__base.apply(this, arguments);
        console.log('with myMod');
    },
    didMount() {
        this.__base();
        console.log(`${this.block} with myMod is mounted`);
    }
});
