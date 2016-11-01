import { html as vnode } from 'snabbdom-jsx'
import { BEM } from './interfaces'

function isBemBlock <T extends BEM.Constructable>(tag: T): tag is T {
  return tag.__parent && tag.displayName
}

export function html (tag: string | Function | BEM.Constructor, attrs: any, children: any) {
  let props = Object.assign({}, attrs, { children })

  if (typeof tag === 'function' && isBemBlock<BEM.Constructor>(tag as BEM.Constructor)) {
    let f = new (tag as { new(...args: any[]): any })(props)
    return vnode(f.render ? f : () => f, props, children)
  }

  return vnode(tag, props, children)
}
