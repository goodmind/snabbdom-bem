declare module 'b_' {
  export function B(options: any): any
}

declare module 'snabbdom-jsx' {
  export function html(tag: any, attrs: any, children: any): any
  export function svg(tag: any, attrs: any, children: any): any
  export function JSX(nsURI: any, defNS: any, modules: any): any
}

declare module 'inherit' {
  interface Props<T> {
    __constructor(): void
  }

  function inherit<T, U>(base: Function, props: T, staticProps?: any): any
  function inherit<T>(props: T, staticProps: any): any
  function inherit<T>(mixins: Function[], props: T, staticProps: any): any
  namespace inherit {
    export function self(base: Function, props: Props<any>, staticProps: any): any
    export function self(props: Props<any>, staticProps: any): any
    export function self(mixins: Function[], props: Props<any>, staticProps: any): any
  }

  export = inherit
}

declare namespace JSX {
  export interface Element {}
}

declare module 'snabbdom-bem' {
  export function html(tag: any, attrs: any, children: any): any;
  export function decl(base: any, fields?: any, staticFields?: any): any;
  export function declMod(predicate: (...args: any[]) => any, fields: any, staticFields?: any): any;
  export default function Bem({block, elem, mods, tag, mix, attrs, cls, children}: any): JSX.Element;
}