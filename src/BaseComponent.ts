/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

import * as inherit from 'inherit'

let Component = inherit(
  {
    __constructor (props: any): void {
      this.props = props
      this.hooks = {
        'hook-init': this.hookInit.bind(this),
        'hook-insert': this.hookInsert.bind(this),
        'hook-prepatch': this.hookPrepatch.bind(this),
        'hook-update': this.hookUpdate.bind(this),
        'hook-destroy': this.hookDestroy.bind(this)
      }
    },
    hookInit () {
      return
    },
    hookInsert () {
      return
    },
    hookPrepatch () {
      return
    },
    hookUpdate () {
      return
    },
    hookDestroy () {
      return
    }
  },
  {})

export default inherit(Component, {
  __constructor (): void {
    this.__base.apply(this, arguments)
    this.willInit(this.props)
  },

  willInit (): void {
    return
  },

  tag (): string {
    return 'div'
  },

  attrs (): null {
    return null
  },

  mods (): null {
    return null
  },

  cls (): string {
    return ''
  },

  mix (): null {
    return null
  },

  render (): any {
    const { props } = this
    const res = this.__render(
      this.tag(props),
      this.attrs(props),
      this.block,
      this.elem,
      this.mods(props),
      [props.mix, this.mix(props)],
      this.cls(props),
      this.content(props, props.children),
      this.hooks
    )

    return this.wrap ? this.wrap(res) : res
  },

  content (_: any, children: any): any {
    return children
  }
})
