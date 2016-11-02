/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

const { html } = require('snabbdom-jsx')
import ClassNameBuilder from './ClassNameBuilder';

export default function (classNameBuilder: ClassNameBuilder) {
  return (Tag: string, attrs: any = {}, block: any, elem: any, mods: any, mixes: any, cls: any, content: any, hooks: any) => {
    return (
      <Tag
        className={classNameBuilder.stringify(
                    block,
                    elem,
                    mods,
                    classNameBuilder.joinMixes(mixes),
                    cls)}
        {...hooks}
        {...attrs}>
        {content}
      </Tag>
    );
  };
}
