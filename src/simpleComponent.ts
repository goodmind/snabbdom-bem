/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

import renderTag from './renderTag'
import ClassNameBuilder from './ClassNameBuilder'

export default function (classNameBuilder: ClassNameBuilder) {
  const _render = renderTag(classNameBuilder)
  return ({ block, elem, mods, tag = 'div', mix, attrs, cls, children, hooks }: any) => {
    const typeOfBlock = typeof block
    if (typeOfBlock === 'object') {
      block = block.block
    } else if (typeOfBlock === 'function') {
      block = block.prototype.block
    }

    return _render(tag, attrs, block, elem, mods, mix, cls, children, hooks)
  }
}
