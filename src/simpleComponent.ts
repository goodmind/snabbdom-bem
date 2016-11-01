import renderTag from './renderTag'
import ClassNameBuilder from './ClassNameBuilder'

export default function (classNameBuilder: ClassNameBuilder) {
  const _render = renderTag(classNameBuilder)
  return ({ block, elem, mods, tag = 'div', mix, attrs, cls, children }: any) => {
    const typeOfBlock = typeof block
    if (typeOfBlock === 'object') {
      block = block.block
    } else if (typeOfBlock === 'function') {
      block = block.prototype.block
    }

    return _render(tag, attrs, block, elem, mods, mix, cls, children)
  }
}
