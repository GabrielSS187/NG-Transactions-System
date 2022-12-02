import { dehydrate, QueryClient, useQuery } from 'react-query';

export const queryClientObj = {
  queryClient: new QueryClient(),
  dehydrate,
  useQuery,
};