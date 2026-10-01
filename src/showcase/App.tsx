import { useEffect, useState } from 'react';
import { Alert, Button, Checkbox, TextField } from '../components';
import { Icon, Mark, type IconName } from './Icons';
import { Orbital } from './Orbital';
import { Catalog } from './Catalog';
import { Foundations } from './Foundations';
import { Mission } from './Mission';
import { useTheme, type Theme } from './useTheme';

const pages = ['overview', 'components', 'foundations', 'playground'] as const;
type Page = (typeof pages)[number];
const pageNames = {
  overview: 'Overview',
  components: 'Components',
  foundations: 'Foundations',
  playground: 'Playground',
};
const pageIcons: Record<Page, IconName> = {
  overview: 'grid',
  components: 'layers',
  foundations: 'palette',
  playground: 'rocket',
};
const readPage = (): Page =>
  pages.find((page) => page === window.location.hash.slice(1)) ?? 'overview';
const storybookUrl = `${import.meta.env.BASE_URL}storybook/`;

function ThemePreview({
  theme,
  active,
  onSelect,
}: {
  theme: Theme;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className="theme-preview"
      data-theme={theme}
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`Use ${theme === 'dark' ? 'Nightfall dark' : 'Daybreak light'} theme`}
    >
      <div className="theme-preview-art" aria-hidden="true">
        <div className="mini-rail">
          <span />
          <span />
          <span />
        </div>
        <div className="mini-window">
          <div className="mini-orbit" />
          <div className="mini-ui">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="mini-palette">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="theme-preview-label">
        <div>
          <span className="eyebrow">{theme === 'dark' ? 'AFTER HOURS' : 'A NEW DAWN'}</span>
          <strong>{theme === 'dark' ? 'Nightfall' : 'Daybreak'}</strong>
        </div>
        <span className="theme-check">
          {active ? <Icon name="check" /> : <Icon name="arrow" />}
        </span>
      </div>
    </button>
  );
}

function Overview({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  const [contacted, setContacted] = useState(false);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            INDEPENDENT UI SYSTEM / V.01
          </span>
          <h1>
            Interfaces.
            <br />
            From another
            <br />
            <span>world.</span>
          </h1>
          <p>
            A sci-fi UI kit with a human side. Familiar controls, thoughtful details, and two very
            different atmospheres.
          </p>
          <div className="hero-actions">
            <a href="#components" className="v-button v-button--primary v-button--lg">
              Explore components <Icon name="arrow" />
            </a>
            <a href="#playground" className="text-link">
              Enter the playground <Icon name="external" />
            </a>
          </div>
          <div className="hero-credit">
            <span className="tiny-cross">✦</span>DESIGNED & BUILT BY GRETA PRISBY
          </div>
        </div>
        <Orbital />
      </section>
      <div className="system-strip">
        <div>
          <strong>06</strong>
          <span>CORE COMPONENTS</span>
        </div>
        <div>
          <strong>02</strong>
          <span>DISTINCT ATMOSPHERES</span>
        </div>
        <div>
          <Icon name="code" width="27" height="27" />
          <span>REACT + TYPESCRIPT</span>
        </div>
        <div>
          <span className="key-cap">↹</span>
          <span>KEYBOARD FRIENDLY</span>
        </div>
      </div>
      <section className="overview-components">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / THE BUILDING BLOCKS</span>
            <h2>Small parts. Big possibilities.</h2>
          </div>
          <a className="text-link" href="#components">
            Meet the components <Icon name="arrow" />
          </a>
        </div>
        <div className="component-grid">
          <article className="sample-card">
            <div className="sample-label">
              <span>01 / BUTTON</span>
              <Icon name="arrow" />
            </div>
            <div className="sample-content">
              <Button onClick={() => setContacted(true)}>
                {contacted ? 'Signal received' : 'Make contact'}{' '}
                <Icon name={contacted ? 'check' : 'arrow'} />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  window.location.hash = 'components';
                }}
              >
                Explore variants
              </Button>
            </div>
            <p role="status">
              {contacted ? 'You made contact. Hello, explorer.' : 'A clear next step.'}
            </p>
          </article>
          <article className="sample-card">
            <div className="sample-label">
              <span>02 / TEXT FIELD</span>
              <Icon name="arrow" />
            </div>
            <div className="sample-content">
              <TextField label="Your call sign" placeholder="Hello, explorer" autoComplete="off" />
            </div>
            <p>Room for a little personality.</p>
          </article>
          <article className="sample-card">
            <div className="sample-label">
              <span>03 / CHECKBOX</span>
              <Icon name="arrow" />
            </div>
            <div className="sample-content">
              <Checkbox label="Ready for the unknown" defaultChecked />
              <Checkbox label="Bring a little curiosity" defaultChecked />
            </div>
            <p>Good things start with a choice.</p>
          </article>
          <article className="sample-card">
            <div className="sample-label">
              <span>04 / ALERT</span>
              <Icon name="arrow" />
            </div>
            <div className="sample-content">
              <Alert tone="success" title="You're in good company">
                All systems ready for a new idea.
              </Alert>
            </div>
            <p>A signal worth noticing.</p>
          </article>
        </div>
      </section>
      <section className="theme-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / CHOOSE YOUR ATMOSPHERE</span>
            <h2>
              Neon nights.
              <br />
              Pastel days.
            </h2>
          </div>
          <p>
            Same components, a different feeling.
            <br />
            Choose a world and watch the whole interface change.
          </p>
        </div>
        <div className="theme-previews">
          <ThemePreview theme="dark" active={theme === 'dark'} onSelect={() => setTheme('dark')} />
          <ThemePreview
            theme="light"
            active={theme === 'light'}
            onSelect={() => setTheme('light')}
          />
        </div>
      </section>
      <section className="playground-banner">
        <div>
          <span className="eyebrow">03 / GO BEYOND THE PARTS</span>
          <h2>Take it for a flight.</h2>
          <p>See the kit come together in an interactive mission planner.</p>
        </div>
        <a className="v-button v-button--primary v-button--lg" href="#playground">
          Launch the playground <Icon name="rocket" />
        </a>
        <div className="banner-rings" aria-hidden="true" />
      </section>
    </>
  );
}

export function App() {
  const [page, setPage] = useState<Page>(readPage);
  const [navOpen, setNavOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [motion, setMotion] = useState(
    () => !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const update = () => {
      setPage(readPage());
      setNavOpen(false);
      window.scrollTo({ top: 0 });
      document.getElementById('page-heading')?.focus();
    };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    document.title = `Vohaul — ${pageNames[page]}`;
  }, [page]);
  return (
    <div className={`app-shell ${motion ? 'motion-enabled' : ''}`}>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        Skip to content
      </a>
      <aside className={`sidebar ${navOpen ? 'nav-open' : ''}`}>
        <a href="#overview" className="brand" aria-label="Vohaul overview">
          <Mark />
          <span>
            VOHAUL<small>INTERFACE SYSTEM</small>
          </span>
        </a>
        <button
          className="mobile-menu"
          aria-expanded={navOpen}
          aria-controls="primary-nav"
          aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setNavOpen(!navOpen)}
        >
          <Icon name={navOpen ? 'close' : 'menu'} />
        </button>
        <div className="sidebar-inner" id="primary-nav">
          <span className="nav-label">EXPLORATION</span>
          <nav aria-label="Main navigation">
            {pages.map((item) => (
              <a href={`#${item}`} key={item} aria-current={page === item ? 'page' : undefined}>
                <Icon name={pageIcons[item]} />
                <span>{pageNames[item]}</span>
                {item === 'components' && <small>06</small>}
              </a>
            ))}
          </nav>
          <span className="nav-label nav-label--second">DEVELOPER SPACE</span>
          <nav aria-label="Resources">
            <a href={storybookUrl}>
              <Icon name="code" />
              <span>Storybook</span>
              <Icon name="external" width="12" />
            </a>
            <a href="https://github.com/Greta/vohaul">
              <Icon name="layers" />
              <span>Source code</span>
              <Icon name="external" width="12" />
            </a>
          </nav>
          <div className="sidebar-bottom">
            <div className="sidebar-signal">
              <div className="signal-bars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="eyebrow">A LITTLE CLOSER TO THE FUTURE.</span>
            </div>
            <button
              className="motion-control"
              onClick={() => setMotion(!motion)}
              aria-pressed={motion}
              aria-label={motion ? 'Pause ambient motion' : 'Enable ambient motion'}
            >
              <Icon name={motion ? 'pause' : 'play'} width="12" height="12" />
              MOTION {motion ? 'ON' : 'OFF'}
            </button>
            <a href="https://github.com/Greta" className="creator-link">
              An experiment by Greta Prisby <Icon name="external" width="12" />
            </a>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <span>VOHAUL</span>
            <span>/</span>
            <strong>{pageNames[page]}</strong>
          </div>
          <div className="topbar-right">
            <span className="version">V 0.1.0</span>
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'Daybreak light' : 'Nightfall dark'} theme`}
            >
              <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
              <span>{theme === 'dark' ? 'Nightfall' : 'Daybreak'}</span>
              <span className="toggle-track">
                <i />
              </span>
            </button>
          </div>
        </header>
        <main id="main-content" className="main-content" tabIndex={-1}>
          <span id="page-heading" tabIndex={-1} className="sr-only">
            {pageNames[page]}
          </span>
          {page === 'overview' ? (
            <Overview theme={theme} setTheme={setTheme} />
          ) : (
            <>
              <div className="page-intro">
                <span className="eyebrow">
                  VOHAUL /{' '}
                  {page === 'components'
                    ? 'THE COMPONENT LAB'
                    : page === 'foundations'
                      ? 'THE DESIGN LANGUAGE'
                      : 'AN INTERACTIVE EXAMPLE'}
                </span>
                <h1>
                  {page === 'components'
                    ? 'Made to be used.'
                    : page === 'foundations'
                      ? 'A world of its own.'
                      : 'Your next mission.'}
                </h1>
                <p>
                  {page === 'components'
                    ? 'Six considered components. Explore their states, try the interactions, and make them your own.'
                    : page === 'foundations'
                      ? 'Color, type, and a little space. The shared decisions that make Vohaul feel like Vohaul.'
                      : 'A working flight planner built with the kit. Give it a name, check the details, and see what happens.'}
                </p>
              </div>
              {page === 'components' ? (
                <Catalog />
              ) : page === 'foundations' ? (
                <Foundations />
              ) : (
                <Mission />
              )}
            </>
          )}
          <footer className="footer">
            <a href="#overview" className="footer-brand">
              <Mark />
              <span>VOHAUL</span>
            </a>
            <span>MADE WITH CURIOSITY. BUILT FOR EXPLORATION.</span>
            <a href="https://github.com/Greta">
              Greta Prisby <Icon name="external" width="12" />
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
