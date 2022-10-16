import { RefObject } from 'react'

export const isChildNode = (parent: any, child: any): boolean => {
  if (parent === child) return true
  let node = child.parentNode

  while (node !== null) {
    if (node === parent) return true
    node = node.parentNode
  }
  return false
}

export const isClickingOutside = (ref: RefObject<any>, wrapperRef: RefObject<any>, event: MouseEvent) => {
  const clickableElementsExists = ref.current && wrapperRef.current && event.target
  const isNotClickingOnChildOrReference = !isChildNode(ref.current, event.target) && ref.current !== event.target
  const isNotClickingOnChildOrWrapper =
    !isChildNode(wrapperRef.current, event.target) &&  wrapperRef.current !== event.target

  return clickableElementsExists && isNotClickingOnChildOrReference && isNotClickingOnChildOrWrapper
}
