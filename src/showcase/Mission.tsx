import { useEffect, useLayoutEffect, useState, type FormEvent } from 'react';
import { Alert, Button, Checkbox, Dialog, Tabs, TextField } from '../components';
import { Icon } from './Icons';

export function Mission() {
  const [name, setName] = useState('');
  const [telemetry, setTelemetry] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [planningTab, setPlanningTab] = useState('checklist');
  const [focusTarget, setFocusTarget] = useState<string | null>(null);
  useLayoutEffect(() => {
    if (focusTarget) {
      document.getElementById(focusTarget)?.focus();
      setFocusTarget(null);
    }
  }, [focusTarget, planningTab]);
  useEffect(() => {
    if (launched) document.getElementById('mission-success-heading')?.focus();
  }, [launched]);
  const error =
    submitted && !name.trim()
      ? 'Name your operation before proceeding. Even genius needs a filing system.'
      : undefined;
  const checkError = submitted && !confirmed;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (!name.trim()) {
      setFocusTarget('mission-name');
      return;
    }
    if (!confirmed) {
      setPlanningTab('checklist');
      setFocusTarget('mission-confirm');
      return;
    }
    setDialog(true);
  };
  return (
    <div className="mission-layout">
      <section className="mission-console">
        <div className="panel-heading">
          <span className="eyebrow">TAKEOVER SIMULATOR</span>
          <span className="chip">
            <span className="status-dot" />
            SIMULATION
          </span>
        </div>
        {launched ? (
          <div className="mission-success">
            <span className="success-orbit">
              <Icon name="check" width="36" height="36" />
            </span>
            <h2 id="mission-success-heading" tabIndex={-1}>
              An inevitable triumph.
            </h2>
            <Alert tone="success" title={`${name.trim()} is ready`} announce>
              Operation approved. {telemetry ? 'Surveillance is enabled.' : 'Surveillance is off.'}{' '}
              This is a local demo. Nothing was sent or launched.
            </Alert>
            <Button
              onClick={() => {
                setLaunched(false);
                setSubmitted(false);
                setConfirmed(false);
              }}
            >
              Plot another takeover <Icon name="arrow" />
            </Button>
          </div>
        ) : (
          <>
            <h2>Draft your inevitable victory.</h2>
            <p className="muted">
              A name. A target. A needlessly elaborate scheme. Try to keep up.
            </p>
            <form onSubmit={submit} noValidate>
              <TextField
                id="mission-name"
                label="Operation name"
                placeholder="e.g. Aggressive Door-to-Door Sales"
                value={name}
                onChange={(event) => setName(event.target.value)}
                error={error}
                required
                maxLength={60}
                hint="Something suitably intimidating for the stationery."
              />
              <div className="mission-route">
                <span className="route-node" />
                <div>
                  <span className="eyebrow">HEADQUARTERS</span>
                  <strong>Asteroid fortress</strong>
                </div>
                <div className="route-line" />
                <span className="route-node route-node--end" />
                <div>
                  <span className="eyebrow">OBJECTIVE</span>
                  <strong>Xenon</strong>
                </div>
              </div>
              <Tabs
                label="Operation planning"
                value={planningTab}
                onValueChange={setPlanningTab}
                items={[
                  {
                    id: 'checklist',
                    label: 'Directives',
                    content: (
                      <div className="checklist">
                        <Checkbox
                          label="Enable surveillance"
                          description="Keep an eye out for suspicious cleaning supplies."
                          checked={telemetry}
                          onChange={(event) => setTelemetry(event.target.checked)}
                        />
                        <Checkbox
                          id="mission-confirm"
                          label="Takeover plan reviewed"
                          description="Confirm the target and operation name."
                          checked={confirmed}
                          onChange={(event) => setConfirmed(event.target.checked)}
                          aria-invalid={checkError || undefined}
                          aria-describedby={checkError ? 'mission-check-error' : undefined}
                        />
                        {checkError && (
                          <p id="mission-check-error" className="v-error">
                            Review your takeover plan before continuing.
                          </p>
                        )}
                      </div>
                    ),
                  },
                  {
                    id: 'details',
                    label: 'Operation details',
                    content: (
                      <dl className="flight-details">
                        <div>
                          <dt>Route</dt>
                          <dd>Fortress → Xenon</dd>
                        </div>
                        <div>
                          <dt>Launch window</dt>
                          <dd>Open</dd>
                        </div>
                        <div>
                          <dt>Division</dt>
                          <dd>Insurance clones</dd>
                        </div>
                      </dl>
                    ),
                  },
                ]}
              />
              <div className="mission-submit">
                <span className="eyebrow">LOCAL DEMO / NO ACCOUNT NEEDED</span>
                <Button type="submit">
                  Review operation <Icon name="arrow" />
                </Button>
              </div>
            </form>
          </>
        )}
      </section>
      <aside className="mission-aside">
        <div className="mission-patch" aria-hidden="true">
          <span>V O H A U L</span>
          <svg viewBox="0 0 200 200">
            <path d="M55 18h90l37 37v90l-37 37H55l-37-37V55Z" />
            <path d="M60 31h80l29 29v80l-29 29H60l-29-29V60Z" strokeDasharray="3 6" />
            <path d="m54 128 46-75 46 75-46-20Z" />
            <path d="M30 142h140M100 18v20M100 162v20" />
          </svg>
          <span>DEPARTMENT OF INEVITABLE VICTORY</span>
        </div>
        <h3>
          Six components.
          <br />
          One working interface.
        </h3>
        <p className="muted">
          Buttons, fields, checkboxes, alerts, tabs, and a confirmation dialog. Try submitting an
          empty plan, use only your keyboard, or switch the lights. Even an evil genius should make
          things usable.
        </p>
        <Alert tone="info" title="A harmless rehearsal">
          This playground runs entirely in your browser. Refreshing resets the plan. Your actual
          planet is quite safe.
        </Alert>
      </aside>
      <Dialog
        open={dialog}
        onOpenChange={setDialog}
        title="Authorize your master plan?"
        description={`Approve operation ${name.trim() || 'Untitled'}. Target: Xenon.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDialog(false)}>
              Revise the scheme
            </Button>
            <Button
              onClick={() => {
                setDialog(false);
                setLaunched(true);
              }}
            >
              Authorize operation <Icon name="rocket" />
            </Button>
          </>
        }
      >
        <Alert tone="info" title="Simulation only">
          This approves your demo plan. No clones will be dispatched.
        </Alert>
      </Dialog>
    </div>
  );
}
