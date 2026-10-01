import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';
const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Operative designation',
    placeholder: 'e.g. Subordinate 07',
    hint: 'An impressive title will not affect your clearance.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A visible label and optional hint or error, connected with aria-describedby. Native input props, refs, validation attributes, and external description IDs are preserved. Keep error text actionable.',
      },
    },
  },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = {
  args: { defaultValue: 'Voyager', error: 'That designation is taken. Enter another.' },
};
export const Required: Story = { args: { required: true } };
export const Disabled: Story = { args: { disabled: true } };
