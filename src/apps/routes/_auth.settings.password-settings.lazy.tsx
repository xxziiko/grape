import { PasswordSettings } from '@/pages/settings';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/settings/password-settings')({
  component: PasswordSettings,
});
