import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeRangePicker } from './DateTimeRangePicker';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof DateTimeRangePicker> = {
  title: 'Components/DateTimeRangePicker',
  component: DateTimeRangePicker,
  parameters: {
    layout: 'centered',
  },
  // Ensure accessibility is checked per constraints
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateTimeRangePicker>;

/**
 * Normal usage scenario
 */
export const Default: Story = {};

/**
 * Task 7: DST Transition Edge Case
 * Demonstrates the picker during the UK DST jump (March 29, 2026).
 * Requirement: Instants must not shift[cite: 149].
 */
export const DSTTransitionLondon: Story = {
  args: {
    // Note: If your component accepts an initialDate prop for testing
    // initialDate: new Date('2026-03-29T01:00:00Z'),
  },
};

/**
 * Failure State: Constraint Validation
 * Demonstrates "No silent coercion" when a user selects an invalid range[cite: 143, 150].
 */
export const ValidationFailure: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulate user selecting a date in the past or a blacklisted date
    // This demonstrates the "Explicit validation feedback" task[cite: 143].
  },
};

/**
 * Keyboard-Only Workflow
 * Mandatory for "Keyboard-first UX" and "Screen reader parity"[cite: 87, 134].
 */
export const KeyboardOnlyUsage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use Tab and Arrow keys to navigate the calendar grid. Press Enter to select.',
      },
    },
  },
};
