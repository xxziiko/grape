import { FormLayout, InputWithLabel } from '@/shared';
import { Form } from 'antd';
import { memo, useCallback, useState } from 'react';

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState<{ [key: string]: string }>({});

  const [form] = Form.useForm();

  const signupHandler = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: api
  }, []);

  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    },
    [],
  );

  return (
    <FormLayout form={form} onClick={signupHandler} buttonCommand="시작하기">
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '이메일을 입력해주세요' },
          {
            type: 'email',
            message: '이메일 형식으로 입력해주세요',
          },
        ]}
      >
        <InputWithLabel
          label="이메일"
          value={userInfo.email}
          name="email"
          placeholder="example@gamil.com"
          onChange={onChangeInput}
          type="text"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: '비밀번호를 입력해주세요' },
          {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/,
            message: '비밀번호는 영문 포함 8자 이상 16자 이하로 입력해주세요',
          },
        ]}
      >
        <InputWithLabel
          label="비밀번호"
          value={userInfo.password}
          onChange={onChangeInput}
          placeholder="영문포함 8~16자 이내"
          name="password"
          type="password"
        />
      </Form.Item>
    </FormLayout>
  );
};

export default memo(LoginForm);