import { useEffect, useState } from 'react';
import { Alert, Button, Checkbox, TextField } from '../components';
import { Icon, Mark, type IconName } from './Icons';
import { Mainframe } from './Mainframe';
import { Catalog } from './Catalog';
import { Foundations } from './Foundations';
import { Mission } from './Mission';
import { useTheme, type Theme } from './useTheme';

const pages = ['overview', 'components', 'foundations', 'playground'] as const;
type Page = (typeof pages)[number];
const pageNames = {
  overview: 'Command center',
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
          <span className="eyebrow">
            {theme === 'dark' ? 'UNFILTERED MEGALOMANIA' : 'XENON / AFTER THE FALL'}
          </span>
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
      <div className="security-strip">
        <span>
          <span className="status-dot" /> SUPREME INTELLECT ONLINE
        </span>
        <span>CLEARANCE: EXCESSIVE</span>
      </div>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            VOHAUL INDUSTRIES / COMMAND INTERFACE
          </span>
          <h1>
            TOTAL
            <br />
            <span>CONTROL.</span>
          </h1>
          <div className="hero-aside">Such a modest ambition.</div>
          <p>
            A React UI kit for an intellect of my magnitude. Six obedient components. Two exquisite
            disguises. One irritating janitor.
          </p>
          <div className="hero-actions">
            <a href="#components" className="v-button v-button--primary v-button--lg">
              Inspect the arsenal <Icon name="arrow" />
            </a>
            <a href="#playground" className="text-link">
              Plot something diabolical <Icon name="external" />
            </a>
          </div>
          <div className="hero-credit">
            <span className="tiny-cross">✦</span>ENGINEERED BY GRETA PRISBY / EGO BY VOHAUL
          </div>
        </div>
        <Mainframe />
      </section>
      <div className="incident-strip">
        <span className="incident-code">ADVISORY / 001</span>
        <span>Janitorial access revoked. Again.</span>
        <span aria-hidden="true">/// /// ///</span>
      </div>
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
            <span className="eyebrow">01 / INSTRUMENTS OF CONTROL</span>
            <h2>A superior class of component.</h2>
          </div>
          <a className="text-link" href="#components">
            Inspect all six <Icon name="arrow" />
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
                {contacted ? 'Order received' : 'Issue an order'}{' '}
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
              {contacted
                ? 'Your minions are pretending to look busy.'
                : 'Go on. Exercise your authority.'}
            </p>
          </article>
          <article className="sample-card">
            <div className="sample-label">
              <span>02 / TEXT FIELD</span>
              <Icon name="arrow" />
            </div>
            <div className="sample-content">
              <TextField
                label="Operative designation"
                placeholder="Anyone but Wilco"
                autoComplete="off"
              />
            </div>
            <p>Your rank is provisional. My genius is not.</p>
          </article>
          <article className="sample-card">
            <div className="sample-label">
              <span>03 / CHECKBOX</span>
              <Icon name="arrow" />
            </div>
            <div className="sample-content">
              <Checkbox label="Activate the clone division" defaultChecked />
              <Checkbox label="Keep the monologue brief" defaultChecked />
            </div>
            <p>The second option is purely aspirational.</p>
          </article>
          <article className="sample-card">
            <div className="sample-label">
              <span>04 / ALERT</span>
              <Icon name="arrow" />
            </div>
            <div className="sample-content">
              <Alert tone="success" title="Genius successfully backed up">
                A body is temporary. An ego is forever.
              </Alert>
            </div>
            <p>Disaster recovery, with delusions of grandeur.</p>
          </article>
        </div>
      </section>
      <section className="theme-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / SELECT YOUR DISGUISE</span>
            <h2>
              After-hours villainy.
              <br />
              Daybreak on Xenon.
            </h2>
          </div>
          <p>
            One nefarious agenda. Two very different palettes.
            <br />
            Change the lights. The superiority complex stays.
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
          <span className="eyebrow">03 / DEPARTMENT OF QUESTIONABLE PLANS</span>
          <h2>Every genius needs a dry run.</h2>
          <p>Prepare a perfectly reasonable takeover in the interactive playground.</p>
        </div>
        <a className="v-button v-button--primary v-button--lg" href="#playground">
          Open the simulator <Icon name="rocket" />
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
      document.getElementById('page-heading')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
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
            VOHAUL<small>SUPREMACY SYSTEMS</small>
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
          <span className="nav-label">COMMAND DIRECTORY</span>
          <nav aria-label="Main navigation">
            {pages.map((item) => (
              <a href={`#${item}`} key={item} aria-current={page === item ? 'page' : undefined}>
                <Icon name={pageIcons[item]} />
                <span>{pageNames[item]}</span>
                {item === 'components' && <small>06</small>}
              </a>
            ))}
          </nav>
          <span className="nav-label nav-label--second">RESEARCH & DEVELOPMENT</span>
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
              <span className="eyebrow">GENIUS LEVELS: UNSUSTAINABLE.</span>
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
              A creation by Greta Prisby <Icon name="external" width="12" />
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
            <span className="version">V 0.2 / CLASSIFIED</span>
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
                    ? 'Tools of the takeover.'
                    : page === 'foundations'
                      ? 'Standards. Mine, of course.'
                      : 'A foolproof plan. Again.'}
                </h1>
                <p>
                  {page === 'components'
                    ? 'Six components at your command. Inspect their states, test their obedience, and requisition the code.'
                    : page === 'foundations'
                      ? 'Hard geometry. Unreasonable confidence. The colors, typography, and construction rules behind the command console.'
                      : 'Name your operation, review the plan, and rehearse your triumph. The universe can wait until you finish the paperwork.'}
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
            <span>
              UNOFFICIAL SPACE QUEST TRIBUTE.
              <br />
              OFFICIAL SUPERIORITY COMPLEX.
            </span>
            <a href="https://github.com/Greta">
              Greta Prisby <Icon name="external" width="12" />
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
