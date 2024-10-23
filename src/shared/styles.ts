import * as stylex from '@stylexjs/stylex';

// TODO: 스타일 중복 제거

export const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    gap: '10px',
  },

  text: {
    color: '#757575',
    fontSize: '13px',
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
});
