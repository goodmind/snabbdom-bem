const { html } = require('snabbdom-jsx')
import ClassNameBuilder from './ClassNameBuilder';

export default function (classNameBuilder: ClassNameBuilder) {
  return (Tag: string, attrs: any = {}, block: any, elem: any, mods: any, mixes: any, cls: any, content: any) => {
    return (
      <Tag
        className={classNameBuilder.stringify(
                    block,
                    elem,
                    mods,
                    classNameBuilder.joinMixes(mixes),
                    cls)}
        {...attrs}>
        {content}
      </Tag>
    );
  };
}
