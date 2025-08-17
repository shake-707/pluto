import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../api/auth/fetch-curr-user';

export const currentUserQuery = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    staleTime: 0,
    //retry: 1,
  });
};
