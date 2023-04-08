import React from 'react'

export const useScrollToBottomAction = (
  callback: () => void,
  offset = 0,
  container: Document | Element = globalThis?.document,
) => {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  React.useEffect(() => {
    if (!container) return
    const handleScroll = () => {
      let scrollContainer = (
        container === document ? document.scrollingElement : container
      ) as Element | null

      if (
        scrollContainer &&
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight - offset
      ) {
        callbackRef.current()
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [container, offset])
}
