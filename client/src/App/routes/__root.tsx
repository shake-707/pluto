import {
  createRootRoute,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Link } from '@tanstack/react-router';
import { currentUserQuery } from '../../Shared/queries/currUser';

const login = <Link to="/auth/login">Login</Link>;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const location = useRouterState({ select: (s) => s.location });
  const { data, isError, isLoading } = currentUserQuery();

  // const account = data.?id ? (
  //   <Link to={`/account/${data.id}`}>Account</Link>
  // ) : null;
  const accountLink = data?.user_name ? (
    <Link to={`/account`}>Account</Link>
  ) : null;
  if (isLoading) return <div>is loading ...</div>;

  const hideHeader = location.pathname.startsWith('/auth');

  return (
    <>
      {!hideHeader && (
        <header>{data ? <>{accountLink}</> : <>{login}</>}</header>
      )}

      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
