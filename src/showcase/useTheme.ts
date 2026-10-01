import { useState } from 'react';
export type Theme = 'dark' | 'light';
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );
  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'dark' ? '#05080d' : '#f2c18f');
    try {
      localStorage.setItem('vohaul-theme', next);
    } catch {
      /* A theme still works without browser storage. */
    }
  };
  return { theme, setTheme };
}
