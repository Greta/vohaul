import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Button } from './Button';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export function Dialog({ open, onOpenChange, title, description, children, footer }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const id = useId();
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (open && !element.open) {
      trigger.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      element.showModal();
    } else if (!open && element.open) {
      element.close();
      trigger.current?.focus();
    }
    return () => {
      if (element.open) element.close();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="v-dialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const nodes = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((node) => node.getClientRects().length > 0);
        const first = nodes[0];
        const last = nodes.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClose={() => {
        if (open && !ref.current?.open) onOpenChange(false);
      }}
    >
      <div className="v-dialog-header">
        <span className="v-eyebrow">VOHAUL / CONFIRMATION</span>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Close dialog"
          onClick={() => onOpenChange(false)}
        >
          ×
        </Button>
      </div>
      <h2 id={`${id}-title`}>{title}</h2>
      {description && (
        <p id={`${id}-description`} className="v-dialog-description">
          {description}
        </p>
      )}
      {children && <div className="v-dialog-body">{children}</div>}
      {footer && <div className="v-dialog-footer">{footer}</div>}
    </dialog>
  );
}
