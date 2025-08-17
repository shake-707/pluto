import {
  createRootRoute,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Link } from '@tanstack/react-router';
import { currentUserQuery } from '@/Shared/queries/currUser';
import { fetchLogoutUser } from '@/Shared/api/logout-user';
import { Button } from '@/Shared/ui/button';

const login = <Link to="/auth/login">Login</Link>;
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const location = useRouterState({ select: (s) => s.location });
  const { data, isError, isLoading } = currentUserQuery();

  const accountLink = data?.user_name ? (
    <Link to={'/account/$username'} params={{ username: data?.user_name }}>
      account
    </Link>
  ) : null;
  const profileLink = data?.user_name ? (
    <Link to={'/profiles/$userName'} params={{ userName: data?.user_name }}>
      Profile
    </Link>
  ) : null;

  if (isLoading) return <div>is loading ...</div>;
  if (isError) return <div>error</div>;

  const hideHeader = location.pathname.startsWith('/auth');

  return (
    <>
      {!hideHeader && (
        <>
          <header>
            {data ? (
              <>
                {accountLink}
                {profileLink}
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    fetchLogoutUser();
                  }}
                >
                  logout
                </Button>
              </>
            ) : (
              <>{login}</>
            )}
          </header>
        </>
      )}

      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
