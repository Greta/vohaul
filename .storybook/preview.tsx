import type { Preview } from '@storybook/react-vite';
import { useEffect, type ReactNode } from 'react';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '../src/components/styles.css';

function Theme({ theme, children }: { theme: string; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return (
    <div
      data-theme={theme}
      style={{
        padding: 32,
        background: 'var(--v-bg)',
        color: 'var(--v-text)',
        fontFamily: 'var(--v-font)',
        minHeight: 180,
      }}
    >
      {children}
    </div>
  );
}
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Atmosphere',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Nightfall' },
          { value: 'light', title: 'Daybreak' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'dark' },
  decorators: [
    (Story, context) => (
      <Theme theme={context.globals.theme}>
        <Story />
      </Theme>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    a11y: { test: 'error' },
    docs: { toc: true },
  },
};
export default preview;
