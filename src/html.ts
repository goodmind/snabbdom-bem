import { html as vnode } from 'snabbdom-jsx'

function isBemBlock <T extends { displayName: any, __parent: any }>(tag: T): tag is T {
  return tag.__parent && tag.displayName
}

export function html (tag: string | Function | Function & { displayName: any, __parent: any }, attrs: any, children: any) {
  let props = Object.assign({}, attrs, { children })

  if (typeof tag === 'function' && isBemBlock<Function & { displayName: any, __parent: any }>(tag as Function & { displayName: any, __parent: any })) {
    let f = new (tag as { new(...args: any[]): any })(props)
    return vnode(f.render ? f : () => f, props, children)
  }

  return vnode(tag, props, children)
}