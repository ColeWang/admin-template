import { cloneDeep, cloneWith, isArray, isEqual, isNaN, isNil, isUndefined, omitBy } from 'lodash-es'
import { Comment, Fragment, getCurrentScope, isProxy, onScopeDispose, toRaw } from 'vue'

export function tryOnScopeDispose (stop) {
    const scope = getCurrentScope()
    scope && onScopeDispose(stop)
    return scope
}

export function cloneProxyToRaw (proxy) {
    return cloneWith(proxy, (value) => {
        if (isProxy(value)) {
            const nextValue = toRaw(value)
            return cloneDeep(nextValue)
        } else {
            return value
        }
    })
}

export function isEmpty (value) {
    return isEqual(value, '') || isNil(value) || isNaN(value)
}

export function isEmptyObject (object = {}) {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            return false
        }
    }
    return true
}

export function omitNil (object = {}) {
    return omitBy(object, isEmpty)
}

export function omitUndefined (object = {}) {
    return omitBy(object, isUndefined)
}

export function isValidElement (el) {
    return el && el.__v_isVNode && typeof el.type !== 'symbol'
}

export function isEmptyElement (c) {
    const isText = (c.type === Text && c.children.trim() === '')
    const isFragment = c.type === Fragment && c.children.length === 0
    return c && (c.type === Comment || (isText || isFragment))
}

export function filterEmptyElement (children) {
    const result = []
    if (isArray(children) && children.length !== 0) {
        children.forEach((child) => {
            if (isArray(child)) {
                result.push(...child)
            } else if (child && child.type === Fragment && isArray(child.children)) {
                result.push(...filterEmptyElement(child.children))
            } else if (child) {
                result.push(child)
            }
        })
    }
    return result.filter((c) => !isEmptyElement(c))
}
