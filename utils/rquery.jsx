import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    Hydrate
} from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function ReactQuery({ children, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                {children}
            </Hydrate>
        </QueryClientProvider>
    )
}