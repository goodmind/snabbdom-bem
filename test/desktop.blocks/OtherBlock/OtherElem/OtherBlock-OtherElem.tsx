/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

import { decl } from 'snabbdom-bem'
import MyBlock from 'b:MyBlock'
import MyElem from 'b:MyBlock e:MyElem'

export default decl({
  block: 'OtherBlock',
  elem: 'OtherElem',
  content () {
    return <MyElem />
  }
})
