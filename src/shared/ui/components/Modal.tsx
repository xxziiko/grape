import { AlertDialog, Flex } from '@radix-ui/themes';
import { memo } from 'react';

type Modal = {
  title: string;
  content: React.ReactNode;
  triggerButton: React.ReactNode;
  actionButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
  disabled?: boolean;
};

const Modal = (props: Modal) => {
  const {
    title,
    content,
    triggerButton,
    actionButton,
    cancelButton,
    disabled,
  } = props;

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{triggerButton}</AlertDialog.Trigger>
      <AlertDialog.Content aria-describedby={undefined}>
        <AlertDialog.Title>{title}</AlertDialog.Title>

        <Flex gap="3" mb="5" direction="column">
          {content}
        </Flex>

        <Flex gap="3" justify="center">
          {!!cancelButton && (
            <AlertDialog.Action disabled={disabled}>
              {cancelButton}
            </AlertDialog.Action>
          )}
          {!!actionButton && (
            <AlertDialog.Action>{actionButton}</AlertDialog.Action>
          )}
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default memo(Modal);
