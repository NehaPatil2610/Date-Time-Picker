import type { Meta, StoryObj } from '@storybook/react';
// Changed: Removed the './components/' part to look in the same folder
import { DateTimeRangePicker } from './DateTimeRangePicker';

const meta: Meta<typeof DateTimeRangePicker> = {
  title: 'Components/DateTimeRangePicker',
  component: DateTimeRangePicker,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DateTimeRangePicker>;

export const Default: Story = {};
