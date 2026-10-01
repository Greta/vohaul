import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('src/components/styles.css', 'utf8');
function tokens(selector: string) {
  const start = css.indexOf(selector);
  const block = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start));
  return Object.fromEntries(
    [...block.matchAll(/(--v-[\w-]+):\s*(#[0-9a-f]{6})/g)].map((match) => [match[1], match[2]]),
  );
}
function luminance(hex: string) {
  const rgb = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
function contrast(a: string, b: string) {
  const x = luminance(a);
  const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
for (const theme of ['dark', 'light']) {
  describe(`${theme} theme contrast`, () => {
    const t = tokens(`[data-theme='${theme}']`);
    it('keeps primary text, supporting text, and button labels readable', () => {
      for (const bg of ['--v-bg', '--v-surface', '--v-raised']) {
        for (const fg of ['--v-text', '--v-muted', '--v-signal', '--v-lilac'])
          expect(contrast(t[fg], t[bg]), `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
      expect(contrast(t['--v-on-accent'], t['--v-accent'])).toBeGreaterThanOrEqual(4.5);
    });
    it('keeps alert text and control boundaries visible', () => {
      for (const tone of ['cyan', 'warning', 'danger'])
        expect(contrast(t[`--v-${tone}`], t[`--v-${tone}-soft`])).toBeGreaterThanOrEqual(4.5);
      expect(
        contrast(t[theme === 'dark' ? '--v-accent' : '--v-on-accent'], t['--v-accent-soft']),
      ).toBeGreaterThanOrEqual(4.5);
      for (const bg of ['--v-bg', '--v-surface', '--v-raised']) {
        expect(contrast(t['--v-control-border'], t[bg])).toBeGreaterThanOrEqual(3);
        expect(contrast(t['--v-ring'], t[bg])).toBeGreaterThanOrEqual(3);
      }
    });
  });
}
