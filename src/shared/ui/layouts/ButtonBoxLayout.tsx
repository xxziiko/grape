import { flexStyles } from '@/shared';
import * as stylex from '@stylexjs/stylex';
import { memo } from 'react';

const ButtonBoxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div {...stylex.props(flexStyles.column, styles.box)}> {children}</div>
  );
};

export default memo(ButtonBoxLayout);

const styles = stylex.create({
  box: {
    gap: '10px',
    padding: '24px 0',
  },
});
