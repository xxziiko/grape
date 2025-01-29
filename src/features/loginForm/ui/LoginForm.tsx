import { checkEmailExists } from '@/entities/auth';
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  useLoginMutation,
  useSignUpMutation,
} from '@/features/loginForm';
import {
  FormLayout,
  InputWithLabel,
  PopoverIcon,
  textStyles,
  type UserInfo,
} from '@/shared';
import { Flex, Text } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { memo, useCallback } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<UserInfo>({
    mode: 'onBlur',
    criteriaMode: 'all',
    shouldFocusError: true,
  });
  const { mutate: signUpMutaiton } = useSignUpMutation();
  const { mutate: loginMutation } = useLoginMutation(setError);

  const buttonOptions = {
    command: '시작하기',
    disabled: !isValid,
  } as const;

  const handleSignUp: SubmitHandler<UserInfo> = useCallback(
    async (data) => {
      if (data) {
        const hasEmail = await checkEmailExists(data.email);

        if (!hasEmail) signUpMutaiton(data);
        else loginMutation(data);
      }
    },
    [signUpMutaiton, loginMutation],
  );

  return (
    <FormLayout
      buttonOptions={buttonOptions}
      onSubmit={handleSubmit(handleSignUp)}
    >
      <Flex align="center" gap="2">
        <Text color="gray" size="2">
          테스트 아이디
        </Text>
        <PopoverIcon />
      </Flex>

      <InputWithLabel
        register={register('email', EMAIL_VALIDATION)}
        label="이메일"
        placeholder="example@gamil.com"
        type="text"
      />
      <p {...stylex.props(textStyles.errors)}>{errors.email?.message}</p>

      <InputWithLabel
        register={register('password', PASSWORD_VALIDATION)}
        label="비밀번호"
        placeholder="영문포함 8~16자 이내"
        type="password"
      />
      <p {...stylex.props(textStyles.errors)}>{errors.password?.message}</p>
    </FormLayout>
  );
};

export default memo(LoginForm);
