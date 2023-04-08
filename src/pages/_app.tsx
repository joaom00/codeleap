import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
