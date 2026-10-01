# Validation

## Automated checks

`npm run check` checks formatting, runs 18 Vitest tests, checks TypeScript, builds the standalone component library, and builds both the showcase and Storybook.

- Native button behavior, including avoiding accidental submission and blocking repeat clicks while loading
- Field labels, unique IDs, hints, errors, and externally supplied descriptions
- Native checkbox keyboard and form behavior
- Static and announced alert semantics
- Automatic and manual tab activation, disabled tabs, wrapping arrows, Home and End, preserved panel state, and controlled selection
- Dialog state changes under React Strict Mode
- Mission validation, including revealing a missing checklist item from another tab, confirmation, success, and starting again
- axe-core structural checks on the initial mission screen and its validation state
- Text contrast of at least 4.5:1 for tested theme token pairs and at least 3:1 for tested control boundaries and focus rings

The contrast tests read the actual CSS theme values. Decorative artwork and disabled controls are outside those checks.

## Browser checks

Checked in the Chromium-based preview browser on October 1, 2026:

- Nightfall and Daybreak rendering and theme persistence
- Desktop and narrow phone layouts
- Dialog opening, forward and backward focus wrapping, Escape dismissal, and return to the trigger
- Form errors, automatic focus on missing fields, and the completed mission screen
- Tab navigation and interactive component examples
- The built Storybook examples and theme selection

The test DOM does not implement native modal focus or visual layout. Those behaviors are checked in the real browser. These checks are not a full accessibility audit or a claim of exhaustive browser and assistive-technology coverage.
