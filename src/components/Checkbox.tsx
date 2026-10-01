import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, id: suppliedId, className = '', 'aria-describedby': describedBy, ...props },
  ref,
) {
  const generatedId = useId();
  const id = suppliedId ?? generatedId;
  return (
    <div className={`v-checkbox ${className}`}>
      <input
        {...props}
        ref={ref}
        id={id}
        type="checkbox"
        aria-describedby={
          [describedBy, description ? `${id}-description` : ''].filter(Boolean).join(' ') ||
          undefined
        }
      />
      <div>
        <label htmlFor={id}>{label}</label>
        {description && (
          <p className="v-hint" id={`${id}-description`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
});
