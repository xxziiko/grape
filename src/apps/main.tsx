import { queryClient } from '@/shared';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { routeTree } from './routeTree.gen';
import { Provider } from 'jotai';
import Error from '@/pages/Error';

import '@/apps/global.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <Error onClick={resetErrorBoundary} />
              )}
            >
              <Provider>
                <Theme>
                  <RouterProvider router={router} />
                </Theme>
              </Provider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </StrictMode>,
  );
}
