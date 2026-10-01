import { useState } from 'react';
import { Button } from '../components';
import { Icon } from './Icons';
import { CodeBlock } from './CodeBlock';
const tokens = [
  ['--v-accent', 'Authority', '#00F5FF', '#ED7A31'],
  ['--v-lilac', 'Ego', '#FF4CDE', '#425575'],
  ['--v-cyan', 'Intelligence', '#62BAFF', '#355568'],
  ['--v-warning', 'Interference', '#E8FF00', '#6C500F'],
  ['--v-bg', 'Fortress / Xenon sky', '#05080D', '#F2C18F'],
  ['--v-surface', 'Console', '#0A121B', '#DCE1E4'],
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
            Different lights.
            <br />
            Same questionable intentions.
          </h2>
        </div>
        <p>
          Nightfall is electric cyan, hot magenta, and acid yellow. Daybreak borrows from future
          Xenon: scorched orange skies, rust, concrete, and steel blue. Color roles stay consistent,
          while the hues are free to change.
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
            Vh<span>01</span>
          </p>
          <h3>Orbitron + Space Grotesk</h3>
          <p className="muted">
            Orbitron supplies the theatrical authority. Space Grotesk keeps longer passages
            readable. IBM Plex Mono handles labels, coordinates, and classified paperwork.
          </p>
          <span className="mono type-mono">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            0123456789 / : + −
          </span>
        </section>
        <section className="foundation-card">
          <span className="eyebrow">03 / RHYTHM</span>
          <h3>Precision, under duress.</h3>
          <div className="spacing-scale">
            {[4, 8, 12, 16, 24, 32, 48].map((size) => (
              <div key={size}>
                <span style={{ height: size }} />
                <small>{size}</small>
              </div>
            ))}
          </div>
          <p className="muted">
            Square corners, 45-degree cuts, stepped brackets, and segmented scales. A shared spacing
            rhythm keeps the machinery orderly.
          </p>
          <div className="radius-examples">
            <span>90°</span>
            <span>45°</span>
            <span>///</span>
          </div>
        </section>
      </div>
      <section className="theme-code">
        <div>
          <span className="eyebrow">04 / MAKE IT YOURS</span>
          <h2>
            One attribute.
            <br />A convincing disguise.
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
            '<section data-theme="light">\n  <Button>Assume command</Button>\n</section>\n\n/* Your own accent */\n[data-theme="light"] {\n  --v-accent: #d7d0f3;\n  --v-on-accent: #3c3266;\n}'
          }
        />
      </section>
    </div>
  );
}
