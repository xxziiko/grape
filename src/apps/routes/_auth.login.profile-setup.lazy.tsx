import { ProfileSetup } from '@/shared';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/login/profile-setup')({
  component: ProfileSetup,
});
