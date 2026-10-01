import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';
import { Button } from './Button';
function Example() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open transmission</Button>
      <p role="status">{sent ? 'Transmission sent.' : ''}</p>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Send your transmission?"
        description="Your message is ready to leave the station. Take a moment to check the details."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Not yet
            </Button>
            <Button
              onClick={() => {
                setSent(true);
                setOpen(false);
              }}
            >
              Send transmission
            </Button>
          </>
        }
      />
    </>
  );
}
const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: { open: false, onOpenChange: () => {}, title: 'Send your transmission?' },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'A controlled native modal dialog. The browser makes the rest of the document inert, contains focus, and restores it on close. Escape and the close button request onOpenChange(false). Keep a trigger mounted while open and provide an action outside if it must be removed.',
      },
    },
  },
  render: () => <Example />,
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Confirmation: Story = {};
