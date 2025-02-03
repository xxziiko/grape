import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DefaultButton } from '@/shared';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: DefaultButton,
  parameters: {},
  tags: ['autodocs'],
  args: { onClick: () => alert('Button clicked') },
} satisfies Meta<typeof DefaultButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
  args: {
    command: 'text',
    variant: 'primary',
    disabled: false,
    type: 'button',
  },
};

export const Kakao: Story = {
  args: {
    command: '카카오 로그인',
    variant: 'kakao',
    disabled: false,
    type: 'button',
  },
};

export const Cancel: Story = {
  args: {
    command: '닫기',
    variant: 'close',
    disabled: false,
    type: 'button',
  },
};

export const Error: Story = {
  args: {
    command: '취소',
    variant: 'cancel',
    disabled: false,
    type: 'button',
  },
};
