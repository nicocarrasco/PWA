import { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export const queryClientApi = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

export type CustomQueryOptions<T> = Pick<UseQueryOptions<T>, 'onSuccess' | 'onError' | 'onSettled' | 'enabled' | 'retry' | 'placeholderData'>;

export type CustomMutationOptions<TData, TVariables = void> = Pick<UseMutationOptions<TData, unknown, TVariables, unknown>, 'onSuccess' | 'onError' | 'onSettled' |
'retry' | 'onMutate'>;
