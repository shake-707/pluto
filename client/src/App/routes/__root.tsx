import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Link } from '@tanstack/react-router';

const login = <Link to="/auth/login">Login</Link>;
const register = <Link to="/auth/register">Register</Link>;
const about = <Link to="/">About</Link>;

export const Route = createRootRoute({
  component: () => (
    <>
      <div>
        {login} {register}
        {about}
      </div>

      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
