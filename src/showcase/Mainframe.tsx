import { useState } from 'react';
import { Button } from '../components';
import { Icon } from './Icons';

const diagnosticReports = [
  'Intellect: excessive. Humility: not installed.',
  'Backup complete. My genius now occupies two disks.',
  'Security exception: one janitor. How is this still happening?',
  'Conclusion: the equipment is clearly beneath me.',
];

export function Mainframe() {
  const [report, setReport] = useState(-1);
  return (
    <section className="core-console" aria-label="Vohaul mainframe diagnostic demo">
      <div className="core-heading">
        <span>VHL / NEURAL ARCHIVE</span>
        <span className="core-serial">SQ—02 / XII</span>
      </div>
      <div className="core-visual">
        <svg viewBox="0 0 480 340" aria-hidden="true" className="core-map">
          <g fill="none" stroke="var(--v-border)" strokeWidth="1">
            <path d="M18 85V26h92l14 14h250l18-18h70v69M18 255v59h105l14-14h225l14 14h86v-59M0 170h480M240 0v340" />
            <path
              d="M60 60h80M340 60h80M60 280h80M340 280h80M70 45v250M410 45v250"
              strokeDasharray="2 5"
            />
            <path d="M189 47h102l72 72v102l-72 72H189l-72-72V119Z" />
          </g>
          <g fill="none" stroke="var(--v-signal)">
            <circle cx="240" cy="170" r="141" strokeWidth="5" strokeDasharray="2 11" opacity=".7" />
            <circle
              className="core-scan"
              cx="240"
              cy="170"
              r="128"
              strokeWidth="3"
              strokeDasharray="90 28 16 44 170 70 32 90 13 251"
            />
            <path d="M190 68h100l52 52v100l-52 52H190l-52-52V120Z" strokeWidth="2" />
            <path d="M195 78h90l47 47v90l-47 47h-90l-47-47v-90Z" strokeWidth=".7" />
          </g>
          <path
            d="M211 103h58l37 37v60l-37 37h-58l-37-37v-60Z"
            fill="var(--v-accent-soft)"
            stroke="var(--v-signal)"
          />
          <g stroke="var(--v-signal)" strokeWidth=".7" opacity=".35">
            {Array.from({ length: 18 }, (_, i) => (
              <path key={i} d={`M178 ${119 + i * 6}h124`} />
            ))}
          </g>
          <path d="m190 126 22 0 28 61 28-61h22l-40 88h-20Z" fill="var(--v-signal)" />
          <path d="M235 126h10v23h-10Z" fill="var(--v-lilac)" />
          <g fill="none" stroke="var(--v-lilac)" strokeWidth="2">
            <path d="M137 112 104 79H18M343 228l33 33h86M181 62l15-15h87M300 291l-15 15h-91" />
            <path d="M154 204v16l44 44M326 136v-16l-44-44" strokeWidth="5" />
          </g>
          <g fill="var(--v-warning)">
            <path d="m229 12 11 9 11-9ZM229 328l11-9 11 9Z" />
            <rect x="16" y="76" width="6" height="6" />
            <rect x="458" y="258" width="6" height="6" />
            {Array.from({ length: 8 }, (_, i) => (
              <rect key={i} x={22 + i * 7} y="202" width="3" height={9 + (i % 3) * 7} />
            ))}
          </g>
          <g fill="var(--v-signal)">
            {Array.from({ length: 10 }, (_, i) => (
              <rect key={i} x="420" y={105 + i * 6} width={i % 3 === 0 ? 28 : 15} height="2" />
            ))}
          </g>
          <g fill="var(--v-muted)" fontFamily="var(--v-mono)" fontSize="8">
            <text x="19" y="100">
              BIO / DATA
            </text>
            <text x="19" y="112">
              TRANSFER
            </text>
            <text x="376" y="284">
              EGO: ∞
            </text>
            <text x="195" y="331">
              BACKUP CONSCIOUSNESS
            </text>
          </g>
        </svg>
        <span className="core-side-label">PROPERTY OF THE SUPREME INTELLECT</span>
      </div>
      <div className="core-readouts">
        <div>
          <span>INTELLECT</span>
          <strong>
            100<span>%</span>
          </strong>
          <div className="segmented-meter" />
        </div>
        <div>
          <span>HUMILITY</span>
          <strong>
            000<span>%</span>
          </strong>
          <div className="segmented-meter segmented-meter--empty" />
        </div>
        <div>
          <span>LOOSE ENDS</span>
          <strong className="core-threat">001</strong>
          <span className="core-threat-label">ROGER WILCO</span>
        </div>
      </div>
      <div className="core-diagnostic">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setReport((report + 1) % diagnosticReports.length)}
        >
          Run diagnostics <Icon name="arrow" />
        </Button>
        <span className="eyebrow">LOCAL SIMULATION</span>
      </div>
      <p className="diagnostic-report" role="status">
        {report < 0 ? 'Awaiting confirmation of my obvious brilliance.' : diagnosticReports[report]}
      </p>
    </section>
  );
}
