import * as stylex from '@stylexjs/stylex';
import { memo } from 'react';

type NavItemProps = {
  children: React.ReactNode;
  isClicked: boolean;
  onClick: () => void;
};

type NavigationBarProps = {
  selectedNavItem: string;
  onClick: (i: string) => void;
};

const NAVLIST = ['채팅', '친구 목록', '설정'] as const;

const NavigationBar = ({ onClick, selectedNavItem }: NavigationBarProps) => {
  return (
    <nav {...stylex.props(styles.box)}>
      {NAVLIST.map((title) => (
        <NavItem
          key={title}
          isClicked={title === selectedNavItem}
          onClick={() => onClick(title)}
        >
          {title}
        </NavItem>
      ))}
    </nav>
  );
};

const NavItem = ({ children, isClicked, onClick }: NavItemProps) => {
  return (
    <button
      {...stylex.props(
        styles.navItemBase,
        styles.flexCenter,
        isClicked && styles.isClicked,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(NavigationBar);

const styles = stylex.create({
  box: {
    display: 'flex',
    justifyContent: 'space-around',
    minHeight: '50px',
    gap: '50px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#dedede',
  },

  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  isClicked: {
    borderBottomWidth: '3px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'black',
  },

  navItemBase: {
    borderStyle: 'none',
    backgroundColor: 'transparent',
    fontWeight: 600,
    cursor: 'pointer',
  },
});
