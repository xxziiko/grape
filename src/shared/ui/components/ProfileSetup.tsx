import { ProfileForm } from '@/features/profileForm';
import { memo } from 'react';
import AuthLayout from '../layouts/AuthLayout';

const ProfileSetup = () => {
  return (
    <AuthLayout
      component={<ProfileForm />}
      title={'반가워요\n사용하실 이름을 작성해주세요'}
    />
  );
};

export default memo(ProfileSetup);
