import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { memo } from 'react';

const SearchBar = () => {
  return (
    <div {...stylex.props(styles.box)}>
      <TextField.Root
        placeholder="친구 이름"
        variant="soft"
        style={{
          width: '100%',
          height: '100%',
          padding: '15px',
          borderRadius: '26px',
          backgroundColor: 'rgba(220, 201, 235, 0.2)',
        }}
        type="text"
        autoComplete="off"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon width={20} height={20} />
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
};

export default memo(SearchBar);

const styles = stylex.create({
  box: {
    padding: '24px 0',
  },
});
