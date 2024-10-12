import Error from '@/pages/Error';
import { Outlet, createRootRoute } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  errorComponent: Error,
  component: () => (
    <>
      <Outlet />
      {/* {import.meta.env.MODE === 'development' && <TanStackRouterDevtools />} */}
    </>
  ),
});
