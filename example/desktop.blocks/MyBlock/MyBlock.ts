/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

import { decl } from 'snabbdom-bem'

export default decl({
  block: 'MyBlock',
  onClick (e) {
    this.__base.apply(this, arguments)
    console.log('other-level')
  }
})
