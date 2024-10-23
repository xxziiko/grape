import { ProfileSetup } from '@/shared';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/login/profile-setup')({
  component: () => (
    <ProfileSetup title={'반가워요\n사용하실 이름을 작성해주세요'} />
  ),
});
