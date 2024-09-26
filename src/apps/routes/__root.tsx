import { ErrorPage } from '@/pages/error';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Provider } from 'jotai';

export const Route = createRootRoute({
  errorComponent: ErrorPage,
  component: () => (
    <>
      <Provider>
        <Outlet />
      </Provider>
      {import.meta.env.MODE === 'development' && <TanStackRouterDevtools />}
    </>
  ),
});
