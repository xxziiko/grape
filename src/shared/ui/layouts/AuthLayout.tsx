import { PageLayout } from '@/shared';
import { Header } from '@/widgets';
import { memo } from 'react';

const AuthLayout = ({
  component,
  title,
}: {
  component: React.ReactNode;
  title: string;
}) => {
  return (
    <PageLayout>
      <Header isBackIconVisible title={title} />
      {component}
    </PageLayout>
  );
};

export default memo(AuthLayout);
