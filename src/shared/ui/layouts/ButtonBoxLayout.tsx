import * as stylex from '@stylexjs/stylex';
import { memo } from 'react';

const ButtonBoxLayout = ({ children }: { children: React.ReactNode }) => {
  return <div {...stylex.props(styles.box)}> {children}</div>;
};

export default memo(ButtonBoxLayout);

const styles = stylex.create({
  box: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '24px 0',
  },
});
