import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}
export interface TabsProps {
  items: TabItem[];
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  activation?: 'automatic' | 'manual';
  className?: string;
}

export function Tabs({
  items,
  label,
  value,
  defaultValue,
  onValueChange,
  activation = 'automatic',
  className = '',
}: TabsProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items.find((item) => !item.disabled)?.id,
  );
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedValue = value ?? internalValue;
  const selected = items.findIndex((item) => item.id === selectedValue && !item.disabled);
  const activeIndex = selected >= 0 ? selected : items.findIndex((item) => !item.disabled);
  const select = (index: number) => {
    const item = items[index];
    if (!item || item.disabled) return;
    if (value === undefined) setInternalValue(item.id);
    onValueChange?.(item.id);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const enabled = items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0);
    const position = enabled.indexOf(index);
    let next: number | undefined;
    if (event.key === 'ArrowRight') next = enabled[(position + 1) % enabled.length];
    if (event.key === 'ArrowLeft') next = enabled[(position - 1 + enabled.length) % enabled.length];
    if (event.key === 'Home') next = enabled[0];
    if (event.key === 'End') next = enabled.at(-1);
    if (next !== undefined) {
      event.preventDefault();
      refs.current[next]?.focus();
      if (activation === 'automatic') select(next);
    }
  };
  return (
    <div className={`v-tabs ${className}`}>
      <div role="tablist" aria-label={label} className="v-tablist">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            disabled={item.disabled}
            aria-selected={index === activeIndex}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={index !== activeIndex}
          tabIndex={0}
          className="v-tabpanel"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
