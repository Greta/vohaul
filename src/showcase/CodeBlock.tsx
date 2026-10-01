import { useEffect, useRef, useState } from 'react';
import { Button } from '../components';
import { Icon } from './Icons';

export function CodeBlock({ code }: { code: string }) {
  const [message, setMessage] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setMessage('Copied');
    } catch {
      setMessage('Select the code to copy it.');
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), 3000);
  };
  return (
    <div className="code-block">
      <div className="code-heading">
        <span>REACT / TSX</span>
        <Button variant="ghost" size="sm" onClick={copy}>
          <Icon name="copy" />
          Copy code
        </Button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
      <span role="status" className="copy-status">
        {message}
      </span>
    </div>
  );
}
