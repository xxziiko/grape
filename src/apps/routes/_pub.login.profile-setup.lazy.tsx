import { ProfileSetup } from '@/shared';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_pub/login/profile-setup')({
  component: ProfileSetup,
});
