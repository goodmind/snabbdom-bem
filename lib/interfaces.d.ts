import { VNode } from 'snabbdom';
export declare type TOrFunc<T, U> = T | ((props?: U) => T);
export declare namespace BEM {
    interface Props {
        block?: string;
        elem?: string;
        mods?: any;
        tag: string;
        mix?: any[];
        attrs?: any;
        cls?: string;
        children?: any;
    }
    type OrFunc<T> = TOrFunc<T, Props>;
    interface Element {
        block?: OrFunc<string>;
        elem?: OrFunc<string>;
        tag?: OrFunc<string>;
        attrs?: OrFunc<any>;
        mods?: OrFunc<any>;
        cls?: OrFunc<string>;
        mix?: OrFunc<any[]>;
        __constructor(props?: Props): void;
        willInit(props?: Props): void;
        render(): VNode;
        content<T>(props?: Props, children?: any): T | T[];
        wrap?<T>(props?: Props): T | T[];
    }
    interface Constructable {
        displayName: string;
        __parent: any;
    }
    interface Constructor extends Constructable {
        new (props: Props): Element;
    }
}
