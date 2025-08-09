import { useQuery } from '@tanstack/react-query';
import { checkCurrentUser } from '../api/auth/check-user';

export const currentUserQuery = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: checkCurrentUser,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    staleTime: 0,
    //retry: 1,
  });
};
