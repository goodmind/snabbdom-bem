/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

// tslint:disable-next-line:no-unused-variable
const { html } = require('snabbdom-bem')
import Bem, { decl } from 'snabbdom-bem'
import MyBlock from 'b:MyBlock m:myMod m:myModWithVal=valOne'
import MyDerivedBlock from 'b:MyDerivedBlock'
import OtherBlock from 'b:OtherBlock'
import WrappedBlock from 'b:WrappedBlock'
import 'b:OtherBlock e:OtherElem'
import RootElem from 'e:RootElem'

export default decl({
  block: 'Root',
  willInit() {
    this.state = { value: '567' }
  },
  content() {
    return [
      <MyBlock key='1'>
        <Bem block='InlineBlock' elem='Elem' mods={{ a : 'b' }}
             mix={{block: 'YetAnBlock', elem: 'Yep'}}>InlineBlock</Bem>
      </MyBlock>,
      <MyBlock key='2' disabled>321</MyBlock>,
      ' ',
      <MyBlock key='3' myMod>myMod</MyBlock>,
      ' ',
      <MyBlock key='4' myModWithVal='valOne'>myModWithVal valOne</MyBlock>,
      ' ',
      <MyDerivedBlock key='5'>MyDerivedBlock</MyDerivedBlock>,
      <OtherBlock
        key='6'
        value={this.state.value}
        mix={{ block : 'OuterMixedBlock', elem : 'Elem' }}
        otherMod
        onChange={({ target }) => {
          console.log(this)
          this.state.value = target.value
        } }/>,
      <Bem block={this} elem='RootElem' key='6' mods={{ a : 'b' }}>RootElem</Bem>,
      <Bem block={this.__self} elem='OtherElem' key='7'>OtherElem 1</Bem>,
      <Bem block='OtherBlock' elem='OtherElem' key='8'>OtherElem 2</Bem>,
      <WrappedBlock key='9'>wrapped block</WrappedBlock>
    ]
  }
})
