import { FormLayout, InputWithLabel, textStyles } from '@/shared';
import * as stylex from '@stylexjs/stylex';
import { memo, useCallback } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useUserNameMutation } from '..';
import { useAtom } from 'jotai';
import { userIdAtom } from '@/entities/auth';

type UserName = {
  userName: string;
};

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserName>({
    mode: 'onBlur',
    criteriaMode: 'all',
    shouldFocusError: true,
  });
  const { mutate } = useUserNameMutation();
  const [userId] = useAtom(userIdAtom);
  const buttonOptions = {
    command: '확인',
    disabled: !isValid,
  };

  const updateUserName: SubmitHandler<UserName> = useCallback(
    (data) => {
      mutate({ userName: data.userName, userId });
    },
    [mutate, userId],
  );

  return (
    <FormLayout
      buttonOptions={buttonOptions}
      onSubmit={handleSubmit(updateUserName)}
    >
      <InputWithLabel
        label="이름"
        type="text"
        register={register('userName', {
          required: '이름을 입력해주세요',
          maxLength: 5,
          validate: {
            noWhitespace: (value) => {
              return !/\s/.test(value) || '이름에 공백을 포함할 수 없습니다';
            },
          },
        })}
      />
      <p {...stylex.props(textStyles.errors)}>{errors.userName?.message}</p>
    </FormLayout>
  );
};

export default memo(ProfileForm);
