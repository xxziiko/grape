import * as stylex from '@stylexjs/stylex';

export const flexStyles = stylex.create({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },

  column: {
    display: 'flex',
    flexDirection: 'column',
  },

  spaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export const commonStyles = stylex.create({
  centerColumn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '80%',
    gap: '10px',
  },

  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
});

export const textStyles = stylex.create({
  base: {
    fontSize: '13px',
    color: '#757575',
  },
  errors: {
    color: '#EE4A4A',
  },
});
