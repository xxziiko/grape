import type { Meta, StoryFn } from '@storybook/react';
import { InputWithLabel, UserInfo } from '@/shared';
import { useForm } from 'react-hook-form';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '@/features/loginForm';

const meta = {
  title: 'Components/Inputs',
  component: InputWithLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof InputWithLabel>;

export default meta;

const VALIDATION_RULES: Record<string, unknown> = {
  email: EMAIL_VALIDATION,
  password: PASSWORD_VALIDATION,
};

const Template: StoryFn<typeof InputWithLabel> = (args) => {
  const { register } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  return (
    <InputWithLabel
      {...args}
      register={register(
        args.type as keyof UserInfo & keyof typeof VALIDATION_RULES,
        VALIDATION_RULES[args.type as keyof typeof VALIDATION_RULES] ?? {},
      )}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'label',
  type: 'text',
  placeholder: 'placeholder',
};

export const Email = Template.bind({});
Email.args = {
  label: '이메일',
  type: 'email',
  placeholder: 'example@gmail.com',
};

export const Password = Template.bind({});
Password.args = {
  label: '비밀번호',
  type: 'password',
  placeholder: '영문 포함 8~16자 이내',
};
