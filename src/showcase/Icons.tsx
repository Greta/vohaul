import type { SVGProps } from 'react';
export type IconName =
  | 'grid'
  | 'layers'
  | 'palette'
  | 'rocket'
  | 'arrow'
  | 'sun'
  | 'moon'
  | 'code'
  | 'check'
  | 'copy'
  | 'pause'
  | 'play'
  | 'external'
  | 'menu'
  | 'close';
const paths: Record<IconName, React.ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="15" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 10 5-10 5L2 8Z" />
      <path d="m2 12 10 5 10-5M2 16l10 5 10-5" />
    </>
  ),
  palette: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="9" r="1" />
      <circle cx="14" cy="7" r="1" />
      <circle cx="17" cy="12" r="1" />
      <path d="M4 17h6l3 4" />
    </>
  ),
  rocket: (
    <>
      <path d="M14 4c2-1 4-1 6 0 1 2 1 4 0 6l-8 8-6-6Z" />
      <path d="m6 12-3 1 1-6 7-1m1 12-1 3 6-1 1-7M7 17l-3 3" />
      <circle cx="15" cy="9" r="2" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" />
    </>
  ),
  moon: <path d="M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z" />,
  code: (
    <>
      <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
  pause: (
    <>
      <path d="M8 5v14M16 5v14" />
    </>
  ),
  play: <path d="m7 4 13 8-13 8Z" />,
  external: (
    <>
      <path d="M14 3h7v7m0-7L10 14M10 3H3v18h18v-7" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
export function Mark() {
  return (
    <svg width="30" height="32" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M3 5h9l11 25L34 5h9L25 42h-6Z" fill="currentColor" />
      <path d="m20 5 4 8h7l3-8Z" fill="var(--v-lilac)" />
    </svg>
  );
}
