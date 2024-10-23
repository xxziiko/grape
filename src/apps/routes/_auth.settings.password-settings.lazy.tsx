import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/settings/password-settings')({
  component: () => <div>Hello /_auth/settings/password-settings!</div>
})