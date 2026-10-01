import { useEffect, useState, type ReactNode } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  Tabs,
  TextField,
  type ButtonProps,
  type AlertProps,
} from '../components';
import { Icon } from './Icons';
import { CodeBlock } from './CodeBlock';

const descriptions = {
  Button: [
    'An invitation to act.',
    'A clear next step, with room for quieter alternatives. Loading and disabled states are included.',
  ],
  TextField: [
    'A space for a thought.',
    'A visible label, useful guidance, and an error message that tells you how to move forward.',
  ],
  Checkbox: [
    'Small choices. Clear intent.',
    'Familiar native behavior with a generous label and optional supporting text.',
  ],
  Alert: [
    'The right signal.',
    'Updates that stay readable and make their meaning clear through words, symbols, and color.',
  ],
  Tabs: [
    'A change of perspective.',
    'Organize related views. Arrow keys move between tabs, and Home and End jump to either edge.',
  ],
  Dialog: [
    'A moment to decide.',
    'A focused confirmation with a clear way forward and a clear way back. Escape closes it.',
  ],
} as const;
type ComponentName = keyof typeof descriptions;
const names = Object.keys(descriptions) as ComponentName[];
const snippets: Record<ComponentName, string> = {
  Button:
    'import { Button } from \'@greta/vohaul\'\n\n<Button variant="primary" onClick={sendSignal}>\n  Send a signal\n</Button>',
  TextField:
    '<TextField\n  label="Call sign"\n  value={callSign}\n  onChange={e => setCallSign(e.target.value)}\n  hint="How should we address you?"\n  error={error}\n/>',
  Checkbox:
    '<Checkbox\n  label="Keep me in the loop"\n  description="Receive updates from the station."\n  checked={subscribed}\n  onChange={e => setSubscribed(e.target.checked)}\n/>',
  Alert:
    '<Alert tone="success" title="Connection established" announce>\n  Your message arrived safely.\n</Alert>',
  Tabs: "<Tabs\n  label=\"Station information\"\n  items={[\n    { id: 'overview', label: 'Overview', content: <Overview /> },\n    { id: 'crew', label: 'Crew', content: <Crew /> },\n  ]}\n/>",
  Dialog:
    '<Dialog\n  open={open}\n  onOpenChange={setOpen}\n  title="Send your transmission?"\n  description="Take a moment to check the details."\n  footer={<Button onClick={send}>Send transmission</Button>}\n/>',
};
function Choices<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="choices">
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <label key={option} className={value === option ? 'is-chosen' : ''}>
            <input
              type="radio"
              name={label}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
function ButtonDemo() {
  const [variant, setVariant] = useState<NonNullable<ButtonProps['variant']>>('primary');
  const [size, setSize] = useState<NonNullable<ButtonProps['size']>>('md');
  const [state, setState] = useState<'default' | 'loading' | 'disabled'>('default');
  const [sent, setSent] = useState(false);
  useEffect(() => {
    setSent(false);
  }, [variant, size, state]);
  return (
    <>
      <div className="demo-stage">
        <Button
          variant={variant}
          size={size}
          loading={state === 'loading'}
          disabled={state === 'disabled'}
          onClick={() => setSent(true)}
        >
          {sent ? 'Signal received' : 'Send a signal'}
          <Icon name={sent ? 'check' : 'arrow'} />
        </Button>
        <span className="demo-response" role="status">
          {sent ? 'Transmission complete. You made contact.' : 'Go ahead. Make contact.'}
        </span>
      </div>
      <div className="demo-controls">
        <Choices
          label="Variant"
          value={variant}
          options={['primary', 'secondary', 'ghost', 'danger']}
          onChange={setVariant}
        />
        <Choices label="Size" value={size} options={['sm', 'md', 'lg']} onChange={setSize} />
        <Choices
          label="State"
          value={state}
          options={['default', 'loading', 'disabled']}
          onChange={setState}
        />
      </div>
    </>
  );
}
function FieldDemo() {
  const [value, setValue] = useState('');
  const [state, setState] = useState<'default' | 'error' | 'disabled'>('default');
  return (
    <>
      <div className="demo-stage">
        <div className="demo-field">
          <TextField
            label="Call sign"
            placeholder="e.g. Voyager"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            hint="How should we address you?"
            error={state === 'error' ? 'That call sign is already in use. Try another.' : undefined}
            disabled={state === 'disabled'}
          />
        </div>
      </div>
      <div className="demo-controls">
        <Choices
          label="Field state"
          value={state}
          options={['default', 'error', 'disabled']}
          onChange={setState}
        />
      </div>
    </>
  );
}
function CheckboxDemo() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="demo-stage">
      <div className="checklist">
        <Checkbox
          label="Keep me in the loop"
          description="Receive updates from the station."
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
        <Checkbox label="Include mission notes" defaultChecked={false} />
        <Checkbox label="Deep space channel unavailable" disabled />
      </div>
    </div>
  );
}
function AlertDemo() {
  const [tone, setTone] = useState<NonNullable<AlertProps['tone']>>('success');
  const content = {
    success: ['Connection established', 'Your message arrived safely.'],
    info: ['A little heads-up', 'The next transmission window opens soon.'],
    warning: ['Check your coordinates', 'Your destination is outside the usual flight path.'],
    danger: [
      'Signal interrupted',
      'Your message was not sent. Check the connection and try again.',
    ],
  };
  return (
    <>
      <div className="demo-stage">
        <Alert tone={tone} title={content[tone][0]}>
          {content[tone][1]}
        </Alert>
      </div>
      <div className="demo-controls">
        <Choices
          label="Tone"
          value={tone}
          options={['success', 'info', 'warning', 'danger']}
          onChange={setTone}
        />
      </div>
    </>
  );
}
function TabsDemo() {
  return (
    <div className="demo-stage">
      <Tabs
        label="Station information"
        items={[
          {
            id: 'overview',
            label: 'Overview',
            content: (
              <div className="tab-demo-content">
                <span className="big-coordinate">VHL—01</span>
                <p>A small station. A very big universe.</p>
                <span className="chip">ALL SYSTEMS READY</span>
              </div>
            ),
          },
          {
            id: 'crew',
            label: 'Crew',
            content: (
              <div className="tab-demo-content">
                <span className="big-coordinate">04 / 04</span>
                <p>Everyone accounted for. The crew is ready to explore.</p>
              </div>
            ),
          },
          {
            id: 'log',
            label: 'Flight log',
            content: (
              <div className="tab-demo-content">
                <span className="big-coordinate">DAY 042</span>
                <p>Arrived at Kepler. The view was worth the trip.</p>
              </div>
            ),
          },
          { id: 'archive', label: 'Archive', disabled: true, content: null },
        ]}
      />
    </div>
  );
}
function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <div className="demo-stage">
      <Button
        onClick={() => {
          setSent(false);
          setOpen(true);
        }}
      >
        Open transmission <Icon name="external" />
      </Button>
      <span className="demo-response" role="status">
        {sent
          ? 'Transmission sent. The stars are listening.'
          : 'A little space to make a decision.'}
      </span>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Send your transmission?"
        description="Your message is ready to leave the station. You can still take a moment to check the details."
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
              Send transmission <Icon name="arrow" />
            </Button>
          </>
        }
      />
    </div>
  );
}
const demos: Record<ComponentName, () => ReactNode> = {
  Button: ButtonDemo,
  TextField: FieldDemo,
  Checkbox: CheckboxDemo,
  Alert: AlertDemo,
  Tabs: TabsDemo,
  Dialog: DialogDemo,
};
const notes: Record<ComponentName, string> = {
  Button:
    'Uses a native button. Loading keeps its label and prevents repeat clicks. Use a link when the action navigates somewhere.',
  TextField:
    'The label is always visible. Hint and error text are connected to the field, so assistive technology can read them together.',
  Checkbox:
    'Click the label or press Space while focused. The native input handles keyboard interaction and form submission.',
  Alert:
    'Meaning is expressed with a title and symbol as well as color. Use announce for a newly arriving message, not every static notice.',
  Tabs: 'One tab is in the Tab sequence. Left and Right arrows wrap between enabled tabs. Panels remain mounted, so their input values are preserved.',
  Dialog:
    'Uses the browser’s modal dialog. Focus stays inside while open, Escape dismisses it, and focus returns to the trigger when it closes.',
};
export function Catalog() {
  const [selected, setSelected] = useState<ComponentName>('Button');
  const Demo = demos[selected];
  return (
    <div className="catalog-layout">
      <nav className="component-nav" aria-label="Choose a component">
        {names.map((name, index) => (
          <button
            type="button"
            key={name}
            aria-current={selected === name ? 'true' : undefined}
            onClick={() => setSelected(name)}
          >
            <span className="mono">0{index + 1}</span>
            {name}
            <Icon name="arrow" />
          </button>
        ))}
      </nav>
      <section className="component-detail" aria-label={selected}>
        <div className="component-title">
          <div>
            <span className="eyebrow">COMPONENT / 0{names.indexOf(selected) + 1}</span>
            <h2>{selected}</h2>
          </div>
          <span className="chip">REACT + TYPESCRIPT</span>
        </div>
        <h3>{descriptions[selected][0]}</h3>
        <p className="muted">{descriptions[selected][1]}</p>
        <Tabs
          key={selected}
          label={`${selected} example`}
          className="preview-tabs"
          items={[
            { id: 'preview', label: 'Play with it', content: <Demo /> },
            { id: 'code', label: 'Use it', content: <CodeBlock code={snippets[selected]} /> },
          ]}
        />
        <div className="component-note">
          <Icon name="check" />
          <div>
            <h4>Thoughtful by default</h4>
            <p>{notes[selected]}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
