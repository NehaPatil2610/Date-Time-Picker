import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeRangePicker } from './DateTimeRangePicker';

const meta = {
  title: 'Components/DateTimeRangePicker',
  component: DateTimeRangePicker,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DateTimeRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DSTTransition: Story = {
  args: {},
};

export const Validation: Story = {
  args: {},
};
