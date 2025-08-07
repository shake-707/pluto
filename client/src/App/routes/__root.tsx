import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Link } from '@tanstack/react-router';

const login = <Link to="/auth/login">Login</Link>;
const register = <Link to="/auth/register">Register</Link>;
const about = <Link to="/">About</Link>;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const location = useRouterState({ select: (s) => s.location });

  // Hide header if route starts with "/auth"
  const hideHeader = location.pathname.startsWith('/auth');

  return (
    <>
      {!hideHeader && (
        <header>
          {/* your nav links here */}
          {login} {register} {about}
        </header>
      )}

      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}