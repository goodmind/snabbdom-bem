/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

import { declMod } from 'snabbdom-bem'

export default declMod(({ myModWithVal }) => myModWithVal, {
  block: 'MyBlock',
  mods ({ myModWithVal }) {
    return Object.assign(this.__base.apply(this, arguments), myModWithVal)
  }
})
