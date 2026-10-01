import { useState } from 'react';
import { Button } from '../components';
import { Icon } from './Icons';
import { CodeBlock } from './CodeBlock';
const tokens = [
  ['--v-accent', 'Signal', '#A3FFCB', '#BDE9CF'],
  ['--v-lilac', 'Orbit', '#B7B8FF', '#6556A2'],
  ['--v-cyan', 'Atmosphere', '#84E8FF', '#256278'],
  ['--v-warning', 'Solar', '#FFD8A0', '#77501A'],
  ['--v-bg', 'Deep space / Daylight', '#080E16', '#F5F4F0'],
  ['--v-surface', 'Surface', '#101923', '#FFFEFA'],
];
export function Foundations() {
  const [copied, setCopied] = useState('');
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(`Copied ${value}`);
    } catch {
      setCopied(`Select and copy this token: ${value}`);
    }
  };
  return (
    <div className="foundations">
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / COLOR</span>
          <h2>
            The atmosphere changes.
            <br />
            The system stays familiar.
          </h2>
        </div>
        <p>
          Semantic color names keep every component in sync. Dark themes glow. Light themes pair
          soft surfaces with deeper, readable ink.
        </p>
      </div>
      <div className="palette-comparison">
        {(['dark', 'light'] as const).map((theme) => (
          <section className="palette-panel" data-theme={theme} key={theme}>
            <div className="panel-heading">
              <span className="eyebrow">{theme === 'dark' ? 'NIGHTFALL' : 'DAYBREAK'}</span>
              <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
            </div>
            <div className="swatches">
              {tokens.map(([token, label, dark, light]) => (
                <button
                  className="swatch"
                  key={token}
                  onClick={() => copy(token)}
                  aria-label={`Copy ${label} token ${token}`}
                >
                  <span className="swatch-color" style={{ background: `var(${token})` }} />
                  <span>
                    {label}
                    <small>{theme === 'dark' ? dark : light}</small>
                  </span>
                  <Icon name="copy" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="copy-note" role="status">
        {copied || 'Select a swatch to copy its CSS token name.'}
      </p>
      <div className="foundation-grid">
        <section className="foundation-card">
          <span className="eyebrow">02 / TYPOGRAPHY</span>
          <p className="type-specimen">
            Aa<span>01</span>
          </p>
          <h3>Space Grotesk</h3>
          <p className="muted">
            Clear, geometric, and just a little unfamiliar. Paired with IBM Plex Mono for small
            labels and coordinates.
          </p>
          <span className="mono type-mono">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            0123456789 / : + −
          </span>
        </section>
        <section className="foundation-card">
          <span className="eyebrow">03 / RHYTHM</span>
          <h3>A little breathing room.</h3>
          <div className="spacing-scale">
            {[4, 8, 12, 16, 24, 32, 48].map((size) => (
              <div key={size}>
                <span style={{ height: size }} />
                <small>{size}</small>
              </div>
            ))}
          </div>
          <p className="muted">
            A shared spacing rhythm, softly cut corners, and thin outlines bring the interface
            together.
          </p>
          <div className="radius-examples">
            <span>06</span>
            <span>12</span>
            <span>∞</span>
          </div>
        </section>
      </div>
      <section className="theme-code">
        <div>
          <span className="eyebrow">04 / MAKE IT YOURS</span>
          <h2>
            One attribute.
            <br />A different world.
          </h2>
          <p className="muted">
            Apply a theme to the page or a single region. Override the CSS tokens to give your
            project its own atmosphere.
          </p>
          <Button variant="secondary" onClick={() => copy('--v-accent')}>
            Copy accent token <Icon name="copy" />
          </Button>
        </div>
        <CodeBlock
          code={
            '<section data-theme="light">\n  <Button>Start exploring</Button>\n</section>\n\n/* Your own accent */\n[data-theme="light"] {\n  --v-accent: #d7d0f3;\n  --v-on-accent: #3c3266;\n}'
          }
        />
      </section>
    </div>
  );
}
