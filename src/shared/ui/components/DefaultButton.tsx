import { flexStyles } from '@/shared';
import * as stylex from '@stylexjs/stylex';
import { memo } from 'react';

type ButtonProps = {
  command: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'kakao' | 'cancel' | 'close';
  disabled?: boolean;
  icon?: React.ReactNode;
};

const DefaultButton = ({
  command,
  variant = 'primary',
  type = 'button',
  disabled = false,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...stylex.props(
        flexStyles.center,
        styles.primary,
        styles[variant] ?? styles.primary,
        disabled && styles.disabled,
      )}
      {...props}
    >
      {icon && icon}
      {command}
    </button>
  );
};

export default memo(DefaultButton);

const styles = stylex.create({
  primary: {
    gap: '10px',
    height: '50px',
    width: '100%',
    background: {
      default: 'rgba(220, 201, 235, 0.4)',
      ':hover': {
        default: 'rgba(220, 201, 235, 0.6)',
      },
      ':active': {
        default: '#DCC9EB',
      },
    },

    borderColor: '#DCC9EB',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '30px',

    fontWeight: 700,
    fontSize: '17px',
    color: '#6C3C91',
    cursor: 'pointer',
  },

  disabled: {
    backgroundColor: '#E1E0E2',
    color: '#A3A3A3',
    borderStyle: 'none',
  },

  kakao: {
    backgroundColor: {
      default: '#FEE500',
      ':hover': {
        default: 'rgba(246, 225, 12, 0.6)',
      },
    },

    borderColor: 'rgba(246, 225, 12, 0.6)',
    color: '#000000',
  },

  close: {
    backgroundColor: 'rgba(163, 163, 163, 0.2)',
    borderStyle: 'none',
    color: '#4A4545',
  },

  cancel: {
    backgroundColor: '#EE4A4A',
    borderStyle: 'none',
    color: '#ffffff',
  },
});
