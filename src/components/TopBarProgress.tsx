import React from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

export const TopBarProgress = () => {
  const router = useRouter()

  React.useEffect(() => {
    let timeout: NodeJS.Timeout

    const start = () => {
      timeout = setTimeout(NProgress.start, 100)
    }

    const done = () => {
      clearTimeout(timeout)
      NProgress.done()
    }

    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', done)
    router.events.on('routeChangeError', done)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', done)
      router.events.off('routeChangeError', done)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <></>
}
