# Validation

## Automated checks

`npm run check` checks formatting, runs 18 Vitest tests, checks TypeScript, builds the standalone component library, and builds both the showcase and Storybook.

- Native button behavior, including avoiding accidental submission and blocking repeat clicks while loading
- Field labels, unique IDs, hints, errors, and externally supplied descriptions
- Native checkbox keyboard and form behavior
- Static and announced alert semantics
- Automatic and manual tab activation, disabled tabs, wrapping arrows, Home and End, preserved panel state, and controlled selection
- Dialog state changes under React Strict Mode
- Takeover validation, including revealing a missing checklist item from another tab, confirmation, success, and starting again
- axe-core structural checks on the initial takeover screen and its validation state
- Text contrast of at least 4.5:1 for tested theme token pairs and at least 3:1 for tested control boundaries and focus rings

The contrast tests read the actual CSS theme values, including the signal and magenta/plum text used by the redesigned HUD. Decorative artwork and disabled controls are outside those checks.

Storybook's automated scan reports button contrast as inconclusive because the cut-corner background uses pseudo-elements. The primary example showed zero detected violations in both themes. Its foreground/background token pair passes the separate contrast tests, and the rendered button was visually checked. An inconclusive scan is not a complete accessibility pass.

## Browser checks

Checked in the Chromium-based preview browser on October 1, 2026:

- Nightfall and Daybreak rendering and theme persistence
- Desktop (1280px) and narrow phone (390px) layouts, including the redesigned HUD and light-theme confirmation dialog
- The mainframe diagnostic button and its status response
- Dialog opening, forward and backward focus wrapping, Escape dismissal, and return to the trigger
- Form errors, automatic focus on missing fields, and the completed takeover screen
- Tab navigation and interactive component examples
- The built Storybook examples and theme selection

The test DOM does not implement native modal focus or visual layout. Those behaviors are checked in the real browser. These checks are not a full accessibility audit or a claim of exhaustive browser and assistive-technology coverage.
