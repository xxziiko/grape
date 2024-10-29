import { PASSWORD_VALIDATION } from '@/features/loginForm';
import { FormLayout, InputWithLabel, styles } from '@/shared';
import { memo, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as stylex from '@stylexjs/stylex';
import usePasswordMutation from '../model/usePasswordMutation';

type Password = {
  currentPassword: string;
  newPassword: string;
};

const PasswordSettingsForm = () => {
  const { mutate } = usePasswordMutation();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Password>({
    mode: 'onBlur',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const buttonOption = {
    command: '변경하기',
    disabled: !isValid,
  } as const;
  const NEW_PASSWORD_VALIDATION = {
    ...PASSWORD_VALIDATION,
    validate: (value: string) =>
      value === currentPassword || '비밀번호가 일치하지 않습니다',
  };
  const currentPassword = watch('currentPassword');

  const handlePasswordSettings: SubmitHandler<Password> = useCallback(
    async (data) => {
      mutate(data.newPassword);
    },
    [mutate],
  );

  return (
    <FormLayout
      buttonOptions={buttonOption}
      onSubmit={handleSubmit(handlePasswordSettings)}
    >
      <InputWithLabel
        register={register('currentPassword', PASSWORD_VALIDATION)}
        label="새로운 비밀번호"
        type="password"
        placeholder="영문포함 8~16자 이내"
      />
      <p {...stylex.props(styles.errors)}>{errors.currentPassword?.message}</p>

      <InputWithLabel
        register={register('newPassword', NEW_PASSWORD_VALIDATION)}
        label="새로운 비밀번호 확인"
        placeholder="영문포함 8~16자 이내"
        type="password"
      />
      <p {...stylex.props(styles.errors)}>{errors.newPassword?.message}</p>
    </FormLayout>
  );
};

export default memo(PasswordSettingsForm);
