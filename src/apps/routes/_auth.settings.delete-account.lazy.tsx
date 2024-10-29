import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/settings/delete-account')({
  component: () => <div>Hello /_auth/settings/delete-account!</div>,
});
