import React from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import '../app/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary>
                <Component {...pageProps} />
            </HydrationBoundary>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
