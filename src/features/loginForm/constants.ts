export const EMAIL_VALIDATION = {
  required: '이메일을 입력해주세요',
  pattern: {
    value: /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+$/,
    message: '이메일 형식으로 입력해주세요',
  },
};

export const PASSWORD_VALIDATION = {
  required: '비밀번호를 입력해주세요',
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/,
    message: '비밀번호는 영문 포함 8자 이상 16자 이하로 입력해주세요',
  },
};
