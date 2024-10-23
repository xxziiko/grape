import { ProfileForm } from '@/features/profileForm';
import { memo } from 'react';
import AuthLayout from '../layouts/AuthLayout';

const ProfileSetup = ({ title }: { title: string }) => {
  return <AuthLayout component={<ProfileForm />} title={title} />;
};

export default memo(ProfileSetup);
