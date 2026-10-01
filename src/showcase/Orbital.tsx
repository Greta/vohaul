export function Orbital({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`orbital ${compact ? 'orbital--compact' : ''}`}>
      <div className="orbital-cross orbital-cross--a">+</div>
      <div className="orbital-cross orbital-cross--b">+</div>
      <svg
        className="orbital-map"
        viewBox="0 0 520 440"
        role="img"
        aria-label="A glowing wireframe planet surrounded by orbital paths"
      >
        <defs>
          <radialGradient id={compact ? 'orb-glow-small' : 'orb-glow'}>
            <stop stopColor="var(--v-accent)" stopOpacity=".13" />
            <stop offset="1" stopColor="var(--v-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx="260"
          cy="220"
          r="210"
          fill={`url(#${compact ? 'orb-glow-small' : 'orb-glow'})`}
        />
        <g fill="none" stroke="var(--v-border)" strokeWidth="1">
          <path d="M20 220h480M260 10v420" />
          <circle cx="260" cy="220" r="192" strokeDasharray="2 8" />
          <circle cx="260" cy="220" r="168" />
          <path d="M50 45v24h24m372-24h24v24M50 371v24h24m372 0h24v-24" />
        </g>
        <g className="planet-wire" fill="none" stroke="var(--v-accent)" strokeWidth=".85">
          <circle cx="260" cy="220" r="117" />
          <ellipse cx="260" cy="220" rx="89" ry="117" />
          <ellipse cx="260" cy="220" rx="45" ry="117" />
          <ellipse cx="260" cy="220" rx="117" ry="34" />
          <ellipse cx="260" cy="220" rx="117" ry="79" />
          <path d="M143 220h234M260 103v234" />
        </g>
        <g transform="rotate(-26 260 220)" fill="none">
          <ellipse cx="260" cy="220" rx="226" ry="72" stroke="var(--v-lilac)" strokeWidth="1.6" />
          <ellipse cx="260" cy="220" rx="213" ry="64" stroke="var(--v-lilac)" strokeOpacity=".25" />
        </g>
        <g className="orbital-satellite">
          <circle cx="260" cy="52" r="6" fill="var(--v-accent)" />
          <circle cx="260" cy="52" r="13" fill="none" stroke="var(--v-accent)" strokeOpacity=".4" />
        </g>
        <g fill="var(--v-lilac)">
          <rect x="404" y="283" width="7" height="7" transform="rotate(45 407 287)" />
          <circle cx="102" cy="333" r="3" />
        </g>
        <path d="m315 141 39-42h86" fill="none" stroke="var(--v-accent)" strokeWidth=".7" />
        <circle cx="315" cy="141" r="3" fill="var(--v-accent)" />
      </svg>
      {!compact && (
        <>
          <div className="orbit-label orbit-label--top">
            <span className="status-dot" /> TRANSMISSION RECEIVED
          </div>
          <div className="orbit-label orbit-label--right">
            VHL—01
            <br />
            <strong>NEW HORIZONS</strong>
          </div>
          <div className="orbit-label orbit-label--bottom">
            23° 42′ N <span> / </span> 86° 17′ E
          </div>
          <div className="orbit-caption">
            <span>FIG. 01</span>
            <span>AN EXERCISE IN POSSIBILITY</span>
          </div>
        </>
      )}
    </div>
  );
}
