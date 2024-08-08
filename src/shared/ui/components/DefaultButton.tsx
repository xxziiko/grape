import * as stylex from '@stylexjs/stylex';
import { Button } from 'antd';
import { memo } from 'react';

type ButtonProps = {
  command: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  htmlType?: 'submit' | 'button' | 'reset' | undefined;
  style?: any;
  disabled?: boolean;
};

const DefaultButton = ({
  command,
  style,
  htmlType = 'button',
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <Button
      htmlType={htmlType}
      disabled={disabled}
      {...stylex.props(
        styles.base,
        disabled ? styles.disabled : styles.base,
        style,
      )}
      {...props}
    >
      {command}
    </Button>
  );
};

export default memo(DefaultButton);

const styles = stylex.create({
  base: {
    width: '100%',
    minHeight: '60px',

    backgroundColor: {
      default: 'rgba(220, 201, 235, 0.4)',
      ':hover': {
        default: 'rgba(220, 201, 235, 0.6)',
      },
      ':active': {
        default: '#DCC9EB',
      },
    },
    borderRadius: '30px',
    borderColor: {
      default: '#DCC9EB',
    },
    fontWeight: 700,
    fontSize: '18px',
    color: '#6C3C91',
  },

  disabled: {
    backgroundColor: '#E1E0E2',
    color: '#A3A3A3',
  },
});
