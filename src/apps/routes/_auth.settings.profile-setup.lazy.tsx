import { ProfileSetup } from '@/shared';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/settings/profile-setup')({
  component: () => <ProfileSetup title={'변경하실 이름을 작성해주세요'} />,
});
