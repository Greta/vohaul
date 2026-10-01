import { StrictMode, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Alert, Button, Checkbox, Dialog, Tabs, TextField } from '../components';
import { Mission } from '../showcase/Mission';

describe('Actions and forms', () => {
  it('prevents accidental form submission and blocks repeat clicks while loading', async () => {
    const user = userEvent.setup();
    const click = vi.fn();
    const submit = vi.fn((event) => event.preventDefault());
    const { rerender } = render(
      <form onSubmit={submit}>
        <Button onClick={click}>Send</Button>
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(click).toHaveBeenCalledOnce();
    expect(submit).not.toHaveBeenCalled();
    rerender(
      <Button onClick={click} loading>
        Send
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Send' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    await user.click(button);
    expect(click).toHaveBeenCalledOnce();
  });
  it('associates the visible label, hint, error, and external description with a field', () => {
    render(
      <>
        <p id="external">Extra context</p>
        <TextField
          label="Call sign"
          hint="Use a name"
          error="Name is taken"
          aria-describedby="external"
        />
      </>,
    );
    const input = screen.getByRole('textbox', { name: 'Call sign' });
    expect(input).toHaveAccessibleDescription('Extra context Use a name Name is taken');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
  it('generates unique field IDs and accepts supplied IDs', () => {
    render(
      <>
        <TextField label="First" />
        <TextField label="Second" />
        <TextField label="Third" id="custom" />
      </>,
    );
    expect(screen.getByLabelText('First').id).not.toEqual(screen.getByLabelText('Second').id);
    expect(screen.getByLabelText('Third')).toHaveAttribute('id', 'custom');
  });
  it('toggles checkboxes from the label and the keyboard and submits native form data', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <form>
        <Checkbox label="Telemetry" name="telemetry" value="on" description="Flight updates" />
      </form>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Telemetry' });
    await user.click(screen.getByText('Telemetry'));
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAccessibleDescription('Flight updates');
    expect(new FormData(container.querySelector('form')!).get('telemetry')).toBe('on');
    await user.keyboard(' ');
    expect(checkbox).not.toBeChecked();
  });
  it('does not toggle a disabled checkbox', async () => {
    render(<Checkbox label="Unavailable" disabled />);
    await userEvent.click(screen.getByText('Unavailable'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
  it('only announces alerts when requested, using urgency appropriate to the tone', () => {
    const { rerender } = render(<Alert title="Static">Guidance</Alert>);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    rerender(<Alert title="Saved" tone="success" announce />);
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
    rerender(<Alert title="Could not save" tone="danger" announce />);
    expect(screen.getByRole('alert')).toHaveTextContent('Could not save');
  });
});

const items = [
  { id: 'one', label: 'One', content: <TextField label="Saved value" /> },
  { id: 'locked', label: 'Locked', disabled: true, content: 'Hidden' },
  { id: 'two', label: 'Two', content: 'Second panel' },
  { id: 'three', label: 'Three', content: 'Third panel' },
];
describe('Tabs', () => {
  it('wraps arrow navigation, skips disabled items, and supports Home and End', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Sections" items={items} />);
    await user.click(screen.getByRole('tab', { name: 'One' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second panel');
    await user.keyboard('{End}{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });
  it('supports manual activation without selecting while arrows move focus', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Sections" items={items} activation="manual" />);
    await user.click(screen.getByRole('tab', { name: 'One' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
  });
  it('preserves an input when switching panels and leaves only one tab in the Tab sequence', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Sections" items={items} />);
    await user.type(screen.getByLabelText('Saved value'), 'Kepler');
    await user.click(screen.getByRole('tab', { name: 'Two' }));
    await user.click(screen.getByRole('tab', { name: 'One' }));
    expect(screen.getByLabelText('Saved value')).toHaveValue('Kepler');
    expect(screen.getAllByRole('tab').filter((tab) => tab.tabIndex === 0)).toHaveLength(1);
  });
  it('leaves control of selection with the parent', async () => {
    const change = vi.fn();
    render(<Tabs label="Sections" items={items} value="one" onValueChange={change} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(change).toHaveBeenCalledWith('two');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });
});
describe('Dialog lifecycle', () => {
  it('opens under Strict Mode and requests dismissal through the close control and Escape event', async () => {
    function Example() {
      const [open, setOpen] = useState(true);
      return (
        <Dialog open={open} onOpenChange={setOpen} title="Confirm?" description="Check your plan" />
      );
    }
    const { container } = render(
      <StrictMode>
        <Example />
      </StrictMode>,
    );
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Confirm?');
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription('Check your plan');
    fireEvent(
      screen.getByRole('dialog'),
      new Event('cancel', { bubbles: false, cancelable: true }),
    );
    expect(container.querySelector('dialog')).not.toHaveAttribute('open');
  });
  it('closes when its controlled value changes', () => {
    const { rerender, container } = render(
      <Dialog open onOpenChange={() => {}} title="Confirm?" />,
    );
    expect(screen.getByRole('dialog')).toBeVisible();
    rerender(<Dialog open={false} onOpenChange={() => {}} title="Confirm?" />);
    expect(container.querySelector('dialog')).not.toHaveAttribute('open');
  });
});
describe('Mission flow', () => {
  it('validates, focuses the missing field, requires review, and completes a local plan', async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <Mission />
      </StrictMode>,
    );
    await user.click(screen.getByRole('button', { name: 'Review operation' }));
    expect(screen.getByRole('textbox', { name: 'Operation name' })).toHaveFocus();
    expect(
      screen.getByText('Name your operation before proceeding. Even genius needs a filing system.'),
    ).toBeInTheDocument();
    await user.type(screen.getByRole('textbox'), 'Paperwork Apocalypse');
    await user.click(screen.getByRole('tab', { name: 'Operation details' }));
    await user.click(screen.getByRole('button', { name: 'Review operation' }));
    expect(screen.getByRole('tab', { name: 'Directives' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('checkbox', { name: 'Takeover plan reviewed' })).toHaveFocus();
    await user.click(screen.getByRole('checkbox', { name: 'Takeover plan reviewed' }));
    await user.click(screen.getByRole('button', { name: 'Review operation' }));
    expect(screen.getByRole('dialog')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Authorize operation' }));
    expect(screen.getByRole('status')).toHaveTextContent('Paperwork Apocalypse is ready');
    expect(screen.getByRole('heading', { name: 'An inevitable triumph.' })).toHaveFocus();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Plot another takeover' }));
    expect(screen.getByRole('textbox')).toHaveValue('Paperwork Apocalypse');
    expect(screen.getByRole('checkbox', { name: 'Takeover plan reviewed' })).not.toBeChecked();
  });
  it('has no automated structural accessibility violations in the initial and validation views', async () => {
    const { container } = render(
      <main>
        <h1>Takeover simulator</h1>
        <Mission />
      </main>,
    );
    const options = { rules: { 'color-contrast': { enabled: false } } };
    expect((await axe.run(container, options)).violations).toEqual([]);
    await userEvent.click(screen.getByRole('button', { name: 'Review operation' }));
    expect((await axe.run(container, options)).violations).toEqual([]);
  });
});
