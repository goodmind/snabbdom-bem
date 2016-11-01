/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

const { html } = require('snabbdom-bem')
import Bem, { decl } from 'snabbdom-bem'

export default decl({
  block: 'WrappedBlock',
  wrap (wrappedBlock) {
    return <Bem block="Wrapper">{wrappedBlock}</Bem>
  }
})
