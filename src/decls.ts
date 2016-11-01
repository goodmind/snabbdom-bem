/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file,
 You can obtain one at https://mozilla.org/MPL/2.0/. */

import * as inherit from 'inherit'
import renderTag from './renderTag'
import ClassNameBuilder from './ClassNameBuilder'

export default function bemReactCore(options: any, BaseComponent: any, classNameBuilder: ClassNameBuilder) {
  const entities = {}
  BaseComponent.prototype.__render = renderTag(classNameBuilder)

  function applyEntityDecls() {
    const entity = this

    if (entity.decls) {
      entity.decls.forEach(({ fields, staticFields }: { fields: any, staticFields: any }) => {
        entity.cls ?
          inherit.self(entity.cls, fields, staticFields) :
          entity.cls = inherit(
            entity.base ? entity.base : BaseComponent,
            fields,
            Object.assign(
              { displayName: classNameBuilder.stringify(fields.block, fields.elem) },
              staticFields)
          )
      })

      entity.decls = null
    }

    if (entity.modDecls) {
      const ptp = entity.cls.prototype

      entity.modDecls.forEach(({ predicate, fields, staticFields }: any) => {
        for (let name in fields) {
          const field = fields[name]
          if (typeof field === 'function') {
            fields[name] = function () {
              let method: Function
              if (predicate.call(this, this.props)) {
                method = field
              } else {
                const baseMethod = ptp[name]
                if (baseMethod && baseMethod !== field) { method = this.__base }
              }
              return method && method.apply(this, arguments)
            }
          }
        }

        inherit.self(entity.cls, fields, staticFields)
      })

      entity.modDecls = null
    }

    return { 'default': entity.cls }
  }

  function getEntity(key: string) {
    return entities[key] || (entities[key] = {
        cls: null,
        base: null,
        decls: null,
        modDecls: null,
        applyDecls: applyEntityDecls
      })
  }

  return {
    decl(base: any, fields?: any, staticFields?: any) {
      if (typeof base !== 'function') {
        staticFields = fields
        fields = base
        base = undefined
      }

      fixHooks(wrapBemFields(fields))

      const key = classNameBuilder.stringify(fields.block, fields.elem)
      const entity = getEntity(key)

      if (base) {
        if (entity.base) {
          throw new Error(`BEM-entity "${key}" has multiple ancestors`)
        }
        entity.base = base
      }

      entity.decls = entity.decls || []
      entity.decls.push({ fields, staticFields })

      return entity
    },

    declMod(predicate: (...args: any[]) => any, fields: any, staticFields?: any) {
      fixHooks(wrapBemFields(fields))

      const entity = getEntity(classNameBuilder.stringify(fields.block, fields.elem))

      entity.modDecls = entity.modDecls || []
      entity.modDecls.push({ predicate, fields, staticFields })

      return entity
    }
  }

}

function wrapWithFunction(obj: any, name: any) {
  if (Array.isArray(name)) {
    name.forEach(n => wrapWithFunction(obj, n))
  } else {
    if (obj.hasOwnProperty(name)) {
      const val = obj[name]
      if (typeof val !== 'function') { obj[name] = () => val }
    }
  }

  return obj
}

function wrapBemFields(obj: any) {
  return wrapWithFunction(obj, ['tag', 'attrs', 'content', 'mods', 'mix', 'cls'])
}

const lifecycleHooks = {
  willMount: 'componentWillMount',
  didMount: 'componentDidMount',
  willReceiveProps: 'componentWillReceiveProps',
  shouldUpdate: 'shouldComponentUpdate',
  willUpdate: 'componentWillUpdate',
  didUpdate: 'componentDidUpdate',
  willUnmount: 'componentWillUnmount'
}

function fixHooks(obj: any) {
  for (let oldName in lifecycleHooks) {
    if (obj[oldName]) {
      obj[lifecycleHooks[oldName]] = obj[oldName]
      delete obj[oldName]
    }
  }

  return obj
}
