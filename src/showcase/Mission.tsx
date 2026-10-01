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
  const error = submitted && !name.trim() ? 'Give your mission a name before launch.' : undefined;
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
          <span className="eyebrow">MISSION CONTROL</span>
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
              You're cleared for takeoff.
            </h2>
            <Alert tone="success" title={`${name.trim()} is ready`} announce>
              Flight plan confirmed. {telemetry ? 'Telemetry is enabled.' : 'Telemetry is off.'}{' '}
              This is a local demo. Nothing was sent or launched.
            </Alert>
            <Button
              onClick={() => {
                setLaunched(false);
                setSubmitted(false);
                setConfirmed(false);
              }}
            >
              Plan another mission <Icon name="arrow" />
            </Button>
          </div>
        ) : (
          <>
            <h2>Find your next horizon.</h2>
            <p className="muted">
              A little preparation goes a long way. Build your flight plan and run through the
              checklist.
            </p>
            <form onSubmit={submit} noValidate>
              <TextField
                id="mission-name"
                label="Mission name"
                placeholder="e.g. Pale Blue Dot"
                value={name}
                onChange={(event) => setName(event.target.value)}
                error={error}
                required
                maxLength={60}
                hint="Something worth putting on a mission patch."
              />
              <div className="mission-route">
                <span className="route-node" />
                <div>
                  <span className="eyebrow">DEPARTURE</span>
                  <strong>Earth / Low orbit</strong>
                </div>
                <div className="route-line" />
                <span className="route-node route-node--end" />
                <div>
                  <span className="eyebrow">DESTINATION</span>
                  <strong>Kepler Station</strong>
                </div>
              </div>
              <Tabs
                label="Mission planning"
                value={planningTab}
                onValueChange={setPlanningTab}
                items={[
                  {
                    id: 'checklist',
                    label: 'Preflight',
                    content: (
                      <div className="checklist">
                        <Checkbox
                          label="Enable telemetry"
                          description="Include flight updates in the mission plan."
                          checked={telemetry}
                          onChange={(event) => setTelemetry(event.target.checked)}
                        />
                        <Checkbox
                          id="mission-confirm"
                          label="Flight plan reviewed"
                          description="Confirm the destination and mission name."
                          checked={confirmed}
                          onChange={(event) => setConfirmed(event.target.checked)}
                          aria-invalid={checkError || undefined}
                          aria-describedby={checkError ? 'mission-check-error' : undefined}
                        />
                        {checkError && (
                          <p id="mission-check-error" className="v-error">
                            Review your flight plan before continuing.
                          </p>
                        )}
                      </div>
                    ),
                  },
                  {
                    id: 'details',
                    label: 'Flight details',
                    content: (
                      <dl className="flight-details">
                        <div>
                          <dt>Route</dt>
                          <dd>Earth → Kepler</dd>
                        </div>
                        <div>
                          <dt>Flight window</dt>
                          <dd>Open</dd>
                        </div>
                        <div>
                          <dt>Vehicle</dt>
                          <dd>Vohaul Explorer</dd>
                        </div>
                      </dl>
                    ),
                  },
                ]}
              />
              <div className="mission-submit">
                <span className="eyebrow">LOCAL DEMO / NO ACCOUNT NEEDED</span>
                <Button type="submit">
                  Prepare for launch <Icon name="arrow" />
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
            <circle cx="100" cy="100" r="83" />
            <circle cx="100" cy="100" r="70" strokeDasharray="2 6" />
            <path d="m54 128 46-75 46 75-46-20Z" />
            <path d="M30 142h140M100 18v20M100 162v20" />
          </svg>
          <span>EXPLORATION DIVISION</span>
        </div>
        <h3>
          Six components.
          <br />
          One working interface.
        </h3>
        <p className="muted">
          Buttons, fields, checkboxes, alerts, tabs, and a confirmation dialog. Try submitting an
          empty plan, use only your keyboard, or switch the lights.
        </p>
        <Alert tone="info" title="Your mission stays here">
          This playground runs entirely in your browser. Refreshing resets the flight plan.
        </Alert>
      </aside>
      <Dialog
        open={dialog}
        onOpenChange={setDialog}
        title="Ready for a new horizon?"
        description={`Confirm the flight plan for ${name.trim() || 'your mission'} to Kepler Station.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDialog(false)}>
              Keep planning
            </Button>
            <Button
              onClick={() => {
                setDialog(false);
                setLaunched(true);
              }}
            >
              Confirm mission <Icon name="rocket" />
            </Button>
          </>
        }
      >
        <Alert tone="info" title="Simulation only">
          This confirms your demo plan. No real mission is launched.
        </Alert>
      </Dialog>
    </div>
  );
}
