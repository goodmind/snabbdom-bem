/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

import decls from './decls'
import BaseComponent from './BaseComponent'
import ClassNameBuilder from './ClassNameBuilder'
import simpleComponent from './simpleComponent'

const defaultNaming = new ClassNameBuilder({
  elementSeparator : '-',
  modSeparator : '_',
  modValueSeparator : '_'
})
const defaultDecls = decls({}, BaseComponent, defaultNaming)

export const { decl, declMod } = defaultDecls
export { html } from './html'
export default simpleComponent(defaultNaming)
