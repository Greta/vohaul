import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    label: 'Station information',
    items: [
      { id: 'overview', label: 'Overview', content: 'Welcome to Kepler Station.' },
      {
        id: 'crew',
        label: 'Crew',
        content: 'Everyone accounted for. The crew is ready to explore.',
      },
      {
        id: 'log',
        label: 'Flight log',
        content: 'Day 042. Arrived at Kepler. The view was worth the trip.',
      },
      { id: 'archive', label: 'Archive', disabled: true, content: null },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Horizontal tabs with roving focus, Left and Right arrows, Home and End, and skipped disabled tabs. Automatic activation is the default. Manual activation lets Enter or Space select the focused tab. Panels stay mounted to preserve form state.',
      },
    },
  },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Automatic: Story = {};
export const Manual: Story = { args: { activation: 'manual' } };
export const InitialSelection: Story = { args: { defaultValue: 'crew' } };
