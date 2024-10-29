import { PasswordSettingsForm } from '@/features/settings';
import { PageLayout } from '@/shared';
import { Header } from '@/widgets';
import { memo } from 'react';

const PasswordSettings = () => {
  return (
    <PageLayout>
      <Header title={'새로운 비밀번호를\n입력해주세요'} isBackIconVisible />
      <PasswordSettingsForm />
    </PageLayout>
  );
};

export default memo(PasswordSettings);
