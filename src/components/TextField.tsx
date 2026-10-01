import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: ReactNode;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, id: suppliedId, className = '', 'aria-describedby': describedBy, ...props },
  ref,
) {
  const generatedId = useId();
  const id = suppliedId ?? generatedId;
  const description = [describedBy, hint ? `${id}-hint` : '', error ? `${id}-error` : '']
    .filter(Boolean)
    .join(' ');
  return (
    <div className={`v-field ${className}`}>
      <label htmlFor={id}>
        {label}
        {props.required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        {...props}
        ref={ref}
        id={id}
        className="v-input"
        aria-describedby={description || undefined}
        aria-invalid={error ? true : props['aria-invalid']}
      />
      {hint && (
        <p className="v-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="v-error" id={`${id}-error`}>
          <span aria-hidden="true">! </span>
          {error}
        </p>
      )}
    </div>
  );
});
