import * as stylex from '@stylexjs/stylex';
import { memo } from 'react';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div {...stylex.props(styles.box)}>{children}</div>;
};

export default memo(PageLayout);

const styles = stylex.create({
  box: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 24px',
    height: '100%',
  },
});
