import React, { useEffect, useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import '../app/globals.css';
import { useRouter } from 'next/router';
import Spinner from '../components/Spinner';

export default function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleRouteChangeStart = () => setIsLoading(true);
        const handleRouteChangeComplete = () => setIsLoading(false);

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeComplete);
        };
    }, [router.events]);

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary>
                {isLoading && (
                    <div className='bg-[#5454548f] fixed inset-0 flex items-center justify-center'>
                        <Spinner />
                    </div>
                )}
                <Component {...pageProps} />
            </HydrationBoundary>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
