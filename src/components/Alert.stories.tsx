import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    title: 'Connection established',
    children: 'Your message arrived safely.',
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
    title: 'A little heads-up',
    children: 'The next transmission window opens soon.',
  },
};
export const Warning: Story = {
  args: {
    tone: 'warning',
    title: 'Check your coordinates',
    children: 'Your destination is outside the usual flight path.',
  },
};
export const Danger: Story = {
  args: {
    tone: 'danger',
    title: 'Signal interrupted',
    children: 'Your message was not sent. Check the connection and try again.',
  },
};
