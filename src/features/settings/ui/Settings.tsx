import { memo } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Link } from '@tanstack/react-router';

const MENU = ['비밀번호 설정하기', '닉네임 변경하기', '회원 탈퇴'] as const;
const ROUTES = [
  '/settings/password-settings',
  '/settings/profile-setup',
  '/settings/delete-account',
] as const;

const Settings = () => {
  return (
    <main>
      <ul>
        {MENU.map((list, index) => (
          <li key={list}>
            <Link {...stylex.props(styles.list)} to={ROUTES[index]}>
              <p {...stylex.props(styles.text)}>{list}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default memo(Settings);

const styles = stylex.create({
  list: {
    display: 'flex',
    alignItems: 'center',
    padding: '30px 0',
    width: '100%',
    borderBottom: '1px solid #dedede',
  },

  text: {
    padding: '0 15px',
    fontSize: '14px',
    fontWeight: 500,
  },
});
