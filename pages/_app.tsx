import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        }
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />  
      
      <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
