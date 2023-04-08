import '@/styles/globals.css'
import '@/styles/nprogress.css'

import React from 'react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toasts } from '@/components/Toast'
import { TopBarProgress } from '@/components/TopBarProgress'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Toasts>
          <Component {...pageProps} />
          <TopBarProgress />
        </Toasts>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
