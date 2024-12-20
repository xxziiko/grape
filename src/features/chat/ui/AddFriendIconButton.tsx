import { memo, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { IconButton, TextField } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { DefaultButton, Modal } from '@/shared';

const AddFriendIconButton = () => {
  const [disabledButton, setDisabledButton] = useState(true);

  return (
    <Modal
      title="친구 추가"
      content={
        <>
          <p {...stylex.props(styles.description)}>
            등록하실 친구이름을 입력해주세요
          </p>
          <TextField.Root radius="full" autoComplete="off" type="text">
            <TextField.Slot />
          </TextField.Root>
        </>
      }
      triggerButton={
        <IconButton variant="ghost" radius="full" color="gray" highContrast>
          <PlusIcon width={30} height={30} cursor={'pointer'} color="#9e9e9e" />
        </IconButton>
      }
      actionButton={<DefaultButton command="등록" disabled={disabledButton} />}
      cancelButton={<DefaultButton command="취소" styleType="error" />}
      disabled={disabledButton}
    />
  );
};

export default memo(AddFriendIconButton);

const styles = stylex.create({
  description: {
    fontSize: '15px',
    fontWeight: 500,
  },
});
