import { AlertDialog, Flex } from '@radix-ui/themes';
import { memo } from 'react';
import DefaultButton from './DefaultButton';

type Modal = {
  title: string;
  command: string;
  description: React.ReactNode;
  triggerButton: React.ReactNode;
  // onClick: () => void;
};

const Modal = (props: Modal) => {
  const { title, description, command, triggerButton } = props;

  return (
    <AlertDialog.Root>
    </AlertDialog.Root>
  );
};

export default memo(Modal);
