import { VNode } from 'snabbdom'

export type TOrFunc<T, U> = T | ((props?: U) => T)

export namespace BEM {
  export interface Props {
    block?: string
    elem?: string
    mods?: any
    tag: string
    mix?: any[]
    attrs?: any
    cls?: string
    children?: any
  }

  export type OrFunc<T> = TOrFunc<T, Props>

  export interface Element {
    block?: OrFunc<string>
    elem?: OrFunc<string>
    tag?: OrFunc<string>
    attrs?: OrFunc<any>
    mods?: OrFunc<any>
    cls?: OrFunc<string>
    mix?: OrFunc<any[]>

    __constructor (props?: Props): void
    willInit (props?: Props): void
    render(): VNode
    content <T>(props?: Props, children?: any): T | T[]
    wrap? <T>(props?: Props): T | T[]
  }

  export interface Constructable {
    displayName: string
    __parent: any
  }

  export interface Constructor extends Constructable {
    new (props: Props): Element
  }
}
