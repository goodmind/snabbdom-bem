/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

import { B } from 'b_' // TODO: optimize?

export default class ClassNameBuilder {
  b: any

  constructor (options: any) {
    this.b = B(options)
  }

  stringify (block: any, elem: any, mods?: any, mixes?: any[], cls?: any) {
    return this.b(block, elem, mods) +
      (mixes ? ' ' + mixes.map(mix => this.b(mix.block || block, mix.elem, mix.mods)).join(' ') : '') +
      (cls ? ' ' + cls : '')
  }

  joinMixes (mix1: any, mix2?: any): any {
    if (Array.isArray(mix1)) {
      mix2 = mix1[1]
      mix1 = mix1[0]
    }

    if (!mix1 && !mix2) {
      return undefined
    }

    let mixes: any[] = []

    if (mix1) { mixes = [...mixes, ...mix1] }
    if (mix2) { mixes = [...mixes, ...mix2] }

    return mixes
  }

}
