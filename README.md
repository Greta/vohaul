# Vohaul

Neon nights. Pastel days. A little science fiction for everyday interfaces.

Vohaul is my take on a small UI kit with some personality. It pairs the familiar things we use every day, like buttons and forms, with the feeling of a spacecraft console. There are glowing orbital paths, quiet little coordinates, and plenty of room to breathe.

[Explore Vohaul](https://greta.github.io/vohaul/) · [Try the component lab](https://greta.github.io/vohaul/storybook/) · [Find me on GitHub](https://github.com/Greta)

![Vohaul in Nightfall, with mint neon controls and an orbital illustration](docs/nightfall.jpg)

## Two different atmospheres

**Nightfall** brings mint, lavender, and icy blue into deep space. **Daybreak** softens the same interface with pastel surfaces and darker text. Switch between them anywhere in the showcase. Your choice stays with you the next time you visit.

![Vohaul in Daybreak, with soft pastel colors and a light background](docs/daybreak.jpg)

## Take a look around

- **Components** lets you try six building blocks: Button, TextField, Checkbox, Alert, Tabs, and Dialog. Explore their different states and copy a small usage example.
- **Foundations** brings the colors, typography, and spacing together. Select a color swatch to copy its token name.
- **Playground** puts everything to work in a mission planner. Name your mission, review the flight plan, and prepare for launch. It is a local simulation, so nothing leaves your browser.
- **Storybook** gives each component its own space, with editable examples and notes about how to use it.

## The details that matter

The sci-fi touches should make the interface enjoyable to use. Labels stay visible, errors explain what to fix, and the controls work with a keyboard. Motion can be paused and respects reduced-motion preferences. Fonts are hosted with the site.

The kit uses React, TypeScript, and plain CSS. Shared color and spacing choices keep everything feeling related, while CSS variables make the themes easy to adapt.

## Run it locally

Use Node.js 24.

```sh
npm ci
npm run dev
```

Open the local link shown in your terminal. To open the component lab, run `npm run storybook`.

```sh
npm run check       # formatting, tests, library, showcase, and Storybook builds
npm run preview     # preview the built showcase and Storybook together
```

## Use the components

The library build is separate from the showcase. Run `npm run build:lib`, then `npm pack` to create a local package you can install into another React project. Vohaul is not published to the npm registry.

```tsx
import { Button } from '@greta/vohaul';
import '@greta/vohaul/styles.css';

export function Welcome() {
  return (
    <section data-theme="dark">
      <Button onClick={() => alert('Hello, explorer!')}>Make contact</Button>
    </section>
  );
}
```

The fonts are optional, with system fallbacks when they are not loaded. Set `--v-font` and `--v-mono` to use your own. The showcase uses Space Grotesk and IBM Plex Mono. Their font licenses are included in `public/licenses`.

## Checks and publishing

Automated checks cover form behavior, keyboard tabs, dialog state, the mission flow, structural accessibility, and theme color contrast. Browser checks also cover modal focus, small screens, and both themes. See [validation notes](docs/validation.md) for the scope of those checks.

GitHub Actions runs the checks on pull requests. A successful update to `main` publishes the showcase and Storybook to GitHub Pages.
