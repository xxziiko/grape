import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Flex, IconButton, Popover, Text } from '@radix-ui/themes';
import { memo } from 'react';

const PopoverIcon = () => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton radius="full" variant="ghost" color="gray" type="button">
          <InfoCircledIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content>
        <Flex gap="3" direction="column">
          <Flex direction="column">
            <Text color="gray" size="2">
              아이디 1: test1@test.com
            </Text>
            <Text color="gray" size="2">
              아이디2: test2@test.com
            </Text>
          </Flex>

          <Text color="gray" size="2">
            비밀번호: test1234
          </Text>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default memo(PopoverIcon);
