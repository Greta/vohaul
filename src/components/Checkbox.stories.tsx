import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'Enable fortress updates',
    description: 'Receive updates from the clone division.',
  },
  parameters: {
    docs: {
      description: {
        component:
          'A native checkbox. Click the text label or press Space while focused to toggle it. Supports controlled and uncontrolled usage and native form submission.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } };
