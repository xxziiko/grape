import { PageLayout, commonStyles, textStyles } from '@/shared';
import * as stylex from '@stylexjs/stylex';

type NoData = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const NoData = (props: NoData) => {
  const { icon, title, description } = props;
  return (
    <PageLayout>
      <main {...stylex.props(commonStyles.centerColumn)}>
        {icon}
        <h2>{title}</h2>
        <p {...stylex.props(textStyles.base)}>{description}</p>
      </main>
    </PageLayout>
  );
};

export default NoData;
