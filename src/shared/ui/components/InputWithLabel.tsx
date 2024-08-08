import * as stylex from '@stylexjs/stylex';
import { Input } from 'antd';
import { memo } from 'react';

type InputWithLabelProps = {
  label: string;
  value: string;
  placeholder?: string;
  name: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithLabel = ({ label, ...props }: InputWithLabelProps) => {
  return (
    <div {...stylex.props(styles.inputBox)}>
      <p {...stylex.props(styles.label)}>{label}</p>
      <Input {...props} {...stylex.props(styles.input)} />
    </div>
  );
};

export default memo(InputWithLabel);

const styles = stylex.create({
  inputBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  },
  label: {
    margin: 0,
    color: '#a3a3a3',
    fontSize: '13px',
  },
  input: {
    borderRadius: '24px',
    padding: '10px 15px',
  },
});
