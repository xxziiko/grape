import { flexStyles } from '@/shared';
import * as stylex from '@stylexjs/stylex';
import { memo } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type NativeInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputWithLabelProps = {
  label: string;
  register: UseFormRegisterReturn;
  placeholder?: NativeInputProps['placeholder'];
  type: NativeInputProps['type'];
};

const InputWithLabel = ({ label, register, ...props }: InputWithLabelProps) => {
  return (
    <div {...stylex.props(flexStyles.column, styles.inputBox)}>
      <p {...stylex.props(styles.label)}>{label}</p>
      <input {...register} {...props} {...stylex.props(styles.input)} />
    </div>
  );
};

export default memo(InputWithLabel);

const styles = stylex.create({
  inputBox: {
    gap: '7px',
  },
  label: {
    color: '#a3a3a3',
    fontSize: '13px',
  },

  input: {
    borderRadius: '24px',
    padding: '15px',
    borderColor: '#dedede',
    borderStyle: 'solid',
    borderWidth: '1px',
    outlineColor: '#DCC9EB',
  },
});
