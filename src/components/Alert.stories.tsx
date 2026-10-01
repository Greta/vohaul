import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    title: 'Consciousness backed up',
    children: 'My brilliance has outlived another hard drive.',
    tone: 'success',
    announce: false,
  },
  argTypes: { tone: { control: 'select', options: ['info', 'success', 'warning', 'danger'] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Four tones with a title, icon, and supporting text. Static messages do not interrupt assistive technology. Set announce for new messages, using a polite status for most tones and an assertive alert for danger.',
      },
    },
  },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Success: Story = {};
export const Information: Story = {
  args: {
    tone: 'info',
    title: 'A memo from your superior',
    children: 'All departments will admire the new control panel.',
  },
};
export const Warning: Story = {
  args: {
    tone: 'warning',
    title: 'Unscheduled janitor detected',
    children: 'Someone brought a mop to a planetary takeover.',
  },
};
export const Danger: Story = {
  args: {
    tone: 'danger',
    title: 'The plan has encountered Wilco',
    children: 'Operation interrupted. Review your plan and try again.',
  },
};
