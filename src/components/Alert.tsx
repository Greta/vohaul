import type { HTMLAttributes, ReactNode } from 'react';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  children?: ReactNode;
  tone?: 'info' | 'success' | 'warning' | 'danger';
  /** Enable only for a message that appears in response to a user action or a new event. */
  announce?: boolean;
}

const icons = { info: 'i', success: '✓', warning: '!', danger: '!' };

export function Alert({
  title,
  children,
  tone = 'info',
  announce = false,
  className = '',
  ...props
}: AlertProps) {
  return (
    <div
      {...props}
      className={`v-alert v-alert--${tone} ${className}`}
      role={announce ? (tone === 'danger' ? 'alert' : 'status') : undefined}
    >
      <span className="v-alert-icon" aria-hidden="true">
        {icons[tone]}
      </span>
      <div>
        <p className="v-alert-title">{title}</p>
        {children && <div className="v-alert-content">{children}</div>}
      </div>
    </div>
  );
}
