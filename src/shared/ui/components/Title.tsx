import * as stylex from '@stylexjs/stylex';
import type {
  CompiledStyles,
  StyleXArray,
} from '@stylexjs/stylex/lib/StyleXTypes';
import { memo } from 'react';

type TitleProps = {
  text: string;
  style?: StyleXArray<boolean | CompiledStyles | null | undefined>;
};

const Title = ({ text, style }: TitleProps) => {
  return (
    <p {...stylex.props(styles.textEllipsis, styles.title, style)}>{text}</p>
  );
};

export default memo(Title);

const styles = stylex.create({
  title: {
    fontSize: '13px',
    fontWeight: 400,
  },

  textEllipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});
