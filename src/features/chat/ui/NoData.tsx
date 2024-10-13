import { PageLayout, styles } from '@/shared';
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
      <main {...stylex.props(styles.main)}>
        {icon}
        <h2>{title}</h2>
        <p {...stylex.props(styles.text)}>{description}</p>
      </main>
    </PageLayout>
  );
};

export default NoData;
