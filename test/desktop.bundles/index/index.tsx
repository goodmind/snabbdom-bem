const { html } = require('snabbdom-bem')
import { init, VNode } from 'snabbdom'
import Root from 'b:Root'

let patch2: any = init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners'),
]) as any

let patch: (container: HTMLElement, vnode: JSX.Element) => void =
  (patch2 as (container: HTMLElement, vnode: JSX.Element) => void)

patch(
  document.getElementById('root'),
  <Root />
)

