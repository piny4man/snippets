import { useCallback, useLayoutEffect, useRef } from 'react'

export const useSafeDispatch = (dispatch) => {
  const mountedRef = useRef(false)

  useLayoutEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch]
    )
}
