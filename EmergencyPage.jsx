import { useState, useEffect, useRef } from "react";
import "./EmergencyPage.css";

const AMBULANCES_INIT = [
  { id: "AMB-01", driver: "Raza Khan",   phone: "+92-300-1234567", status: "available",   eta: "4 min" },
  { id: "AMB-02", driver: "Imran Malik", phone: "+92-301-9876543", status: "dispatched",  eta: "—"     },
  { id: "AMB-03", driver: "Asif Javed",  phone: "+92-333-5551234", status: "available",   eta: "7 min" },
  { id: "AMB-04", driver: "Tariq Butt",  phone: "+92-321-7778899", status: "maintenance", eta: "—"     },
  { id: "AMB-05", driver: "Hamid Rao",   phone: "+92-300-9991234", status: "available",   eta: "5 min" },
  { id: "AMB-06", driver: "Usman Ghani", phone: "+92-312-4445566", status: "dispatched",  eta: "—"     },
];

const ALERTS_INIT = [
  { id: 1, room: "ICU-3",   patient: "Ahmed Mirza",   type: "Cardiac Arrest",       time: "00:42", critical: true  },
  { id: 2, room: "ER-7",    patient: "Sara Noor",     type: "Respiratory Distress", time: "02:15", critical: true  },
  { id: 3, room: "Ward-12", patient: "Bilal Shah",    type: "Fall / Trauma",        time: "05:30", critical: false },
  { id: 4, room: "ER-9",    patient: "Zara Ahmed",    type: "Stroke",               time: "01:10", critical: true  },
  { id: 5, room: "ICU-5",   patient: "Omar Farooq",   type: "Seizure",              time: "03:45", critical: true  },
  { id: 6, room: "Ward-5",  patient: "Hina Baig",     type: "Allergic Reaction",    time: "06:20", critical: false },
  { id: 7, room: "ER-2",    patient: "Kamran Siddiq", type: "Chest Pain",           time: "00:58", critical: true  },
];

const STATS = [
  { label: "ER Beds Free", value: 4,     icon: "🛏️" },
  { label: "ICU Capacity", value: "68%", icon: "🏥" },
  { label: "Avg Response", value: "3m",  icon: "⚡" },
  { label: "On-Call Docs", value: 7,     icon: "👨‍⚕️" },
];

export default function EmergencyPage() {
  const [alertSent, setAlertSent]         = useState(false);
  const [pulseRing, setPulseRing]         = useState(false);
  const [clock, setClock]                 = useState("");
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts]               = useState(ALERTS_INIT);
  const [ambulances, setAmbulances]       = useState(AMBULANCES_INIT);
  const [form, setForm]                   = useState({ name: "", room: "", type: "Cardiac Arrest", notes: "", critical: true });
  const notifId     = useRef(0);
  const nextAlertId = useRef(ALERTS_INIT.length + 1);
  /* FETCH ALERTS FROM BACKEND */

useEffect(() => {

  fetch("http://localhost:5000/api/emergency")

    .then((res) => res.json())

    .then((data) => {

      if (Array.isArray(data) && data.length > 0) {

        setAlerts(data);
      }
    })

    .catch((err) => console.log(err));

}, []);

  /* live clock */
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-PK", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  /* pulse ring every 4s */
  useEffect(() => {
    const t = setInterval(() => {
      setPulseRing(true);
      setTimeout(() => setPulseRing(false), 1200);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const pushNotif = (msg, kind = "info") => {
    const id = ++notifId.current;
    setNotifications(n => [{ id, msg, kind }, ...n].slice(0, 5));
    setTimeout(() => setNotifications(n => n.filter(x => x.id !== id)), 4000);
  };

  const handleSOSClick = () => {
    setAlertSent(true);
    pushNotif("🚨 SOS dispatched — Response team alerted!", "danger");
    setTimeout(() => setAlertSent(false), 5000);
  };

  /* Dispatch: available → dispatched */
  const handleDispatch = (amb) => {
    if (amb.status !== "available") return;
    setAmbulances(prev => prev.map(a => a.id === amb.id ? { ...a, status: "dispatched", eta: "—" } : a));
    pushNotif(`🚑 ${amb.id} dispatched — Driver: ${amb.driver}`, "success");
  };

  /* Recall: dispatched → available */
  const handleRecall = (amb) => {
    if (amb.status !== "dispatched") return;
    setAmbulances(prev => prev.map(a => a.id === amb.id ? { ...a, status: "available", eta: "~8 min" } : a));
    pushNotif(`✅ ${amb.id} recalled — ${amb.driver} now available`, "info");
  };

  /* Resolve: remove alert */
  const handleResolve = (alert) => {
    setAlerts(prev => prev.filter(a => a.id !== alert.id));
    pushNotif(`✅ ${alert.patient} — case resolved & closed`, "success");
  };

  /* Respond: notify */
  const handleRespond = (alert) => {
    pushNotif(`🏃 Team responding to ${alert.patient} in ${alert.room}`, "danger");
  };

  /* Form: add new alert live */
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   if (!form.name || !form.room) { pushNotif("⚠️ Fill in patient name & room", "warn"); return; }
  //   const now = new Date();
  //   const timeStr = `${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;
  //   const newAlert = { id: nextAlertId.current++, room: form.room, patient: form.name, type: form.type, time: timeStr, critical: form.critical };
  //   setAlerts(prev => [newAlert, ...prev]);
  //   pushNotif(`🚨 Alert raised for ${form.name} in ${form.room}`, "danger");
  //   setForm({ name: "", room: "", type: "Cardiac Arrest", notes: "", critical: true });
  // };
const handleFormSubmit = async (e) => {

  e.preventDefault();

  if (!form.name || !form.room) {

    pushNotif(
      "⚠️ Fill in patient name & room",
      "warn"
    );

    return;
  }

  try {

    const response = await fetch(
      "http://localhost:5000/api/emergency",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          room: form.room,

          patient: form.name,

          type: form.type,

          critical: form.critical,

          notes: form.notes
        })
      }
    );

    const data = await response.json();

    const now = new Date();

    const timeStr =
      `${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;

    const newAlert = {

      id:
        data._id ||
        nextAlertId.current++,

      room: form.room,

      patient: form.name,

      type: form.type,

      time: timeStr,

      critical: form.critical
    };

    setAlerts((prev) => [
      newAlert,
      ...prev
    ]);

    pushNotif(
      `🚨 Alert raised for ${form.name} in ${form.room}`,
      "danger"
    );

    setForm({

      name: "",

      room: "",

      type: "Cardiac Arrest",

      notes: "",

      critical: true
    });

  } catch (error) {

    console.log(error);

    pushNotif(
      "❌ Error sending emergency alert",
      "danger"
    );
  }
};
  const criticalCount  = alerts.filter(a => a.critical).length;
  const availableAmb   = ambulances.filter(a => a.status === "available").length;
  const dispatchedAmb  = ambulances.filter(a => a.status === "dispatched").length;

  return (
    <div className="ep-root">

      {/* TOASTS */}
      <div className="ep-toasts">
        {notifications.map(n => (
          <div key={n.id} className={`ep-toast ep-toast--${n.kind}`}>{n.msg}</div>
        ))}
      </div>

      {/* HEADER */}
      <header className="ep-header">
        <div className="ep-header__brand">
          <span className="ep-header__cross">✚</span>
          <span className="ep-header__name">CareSynce</span>
          <span className="ep-header__dept">Emergency Command</span>
        </div>
        <div className="ep-header__meta">
          <span className="ep-live-dot" /> LIVE
          <span className="ep-clock">{clock}</span>
        </div>
      </header>

      {/* HERO */}
      <section className="ep-hero">
        <div className="ep-hero__bg-grid" />
        <div className={`ep-hero__ring ${pulseRing ? "ep-hero__ring--pulse" : ""}`} />
        <div className="ep-hero__content">
          <div className="ep-hero__eyebrow">Emergency Response System</div>
          <h1 className="ep-hero__title">
            <span className="ep-hero__title--red">EMERGENCY</span>{" "}
            <span className="ep-hero__title--white">CONTROL</span>
          </h1>
          <p className="ep-hero__sub">Rapid dispatch · Real-time monitoring · Instant coordination</p>
          <button className={`ep-sos ${alertSent ? "ep-sos--sent" : ""}`} onClick={handleSOSClick}>
            <span className="ep-sos__icon">🚨</span>
            <span className="ep-sos__label">{alertSent ? "ALERT DISPATCHED" : "SEND SOS ALERT"}</span>
            <span className="ep-sos__sub">{alertSent ? "Teams Notified" : "Press for immediate help"}</span>
          </button>
          <div className="ep-helpline">
            <span>Helpline</span>
            <a href="tel:+921122">📞 +92-11-22 (24/7)</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ep-stats">
        {STATS.map((s, i) => (
          <div key={i} className="ep-stat">
            <span className="ep-stat__icon">{s.icon}</span>
            <span className="ep-stat__value">{s.value}</span>
            <span className="ep-stat__label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* MAIN GRID */}
      <main className="ep-grid">

        {/* Active Alerts */}
        <section className="ep-card ep-card--alerts">
          <div className="ep-card__head">
            <span className="ep-card__title">🔴 Active Alerts</span>
            <div className="ep-card__head-badges">
              <span className="ep-badge ep-badge--red">{criticalCount} Critical</span>
              <span className="ep-badge ep-badge--amber">{alerts.length - criticalCount} Moderate</span>
            </div>
          </div>
          <div className="ep-alerts-list">
            {alerts.length === 0 && (
              <div className="ep-alerts-empty">✅ No active alerts — all clear</div>
            )}
            {alerts.map(a => (
              <div key={a.id} className={`ep-alert-row ${a.critical ? "ep-alert-row--critical" : ""}`}>
                <div className="ep-alert-row__left">
                  <span className={`ep-alert-dot ${a.critical ? "ep-alert-dot--red" : "ep-alert-dot--amber"}`} />
                  <div>
                    <div className="ep-alert-row__patient">{a.patient}</div>
                    <div className="ep-alert-row__type">{a.type}</div>
                  </div>
                </div>
                <div className="ep-alert-row__right">
                  <span className="ep-alert-row__room">{a.room}</span>
                  <span className="ep-alert-row__time">⏱ {a.time}</span>
                </div>
                <div className="ep-alert-row__actions">
                  <button className="ep-btn ep-btn--sm ep-btn--red"   onClick={() => handleRespond(a)}>Respond</button>
                  <button className="ep-btn ep-btn--sm ep-btn--ghost" onClick={() => handleResolve(a)}>Resolve</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Raise New Alert */}
        <section className="ep-card ep-card--form">
          <div className="ep-card__head">
            <span className="ep-card__title">⚡ Raise Patient Alert</span>
          </div>
          <form className="ep-form" onSubmit={handleFormSubmit}>
            <label>Patient Name
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full name" />
            </label>
            <label>Room / Ward
              <input value={form.room} onChange={e => setForm({...form, room: e.target.value})} placeholder="e.g. ICU-4, ER-2" />
            </label>
            <label>Emergency Type
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option>Cardiac Arrest</option>
                <option>Respiratory Distress</option>
                <option>Stroke</option>
                <option>Trauma / Fall</option>
                <option>Allergic Reaction</option>
                <option>Seizure</option>
                <option>Chest Pain</option>
                <option>Other</option>
              </select>
            </label>
            <label className="ep-form__severity-label">Severity
              <div className="ep-form__severity-row">
                <button type="button"
                  className={`ep-severity-btn ${form.critical ? "ep-severity-btn--critical" : ""}`}
                  onClick={() => setForm({...form, critical: true})}>
                  🔴 Critical
                </button>
                <button type="button"
                  className={`ep-severity-btn ${!form.critical ? "ep-severity-btn--moderate" : ""}`}
                  onClick={() => setForm({...form, critical: false})}>
                  🟡 Moderate
                </button>
              </div>
            </label>
            <label>Additional Notes
              <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Describe the situation…" rows={2} />
            </label>
            <button type="submit" className="ep-btn ep-btn--primary ep-btn--full">
              🚨 Raise Emergency Alert
            </button>
          </form>
        </section>

        {/* Ambulance Fleet */}
        <section className="ep-card ep-card--ambulance">
          <div className="ep-card__head">
            <span className="ep-card__title">🚑 Ambulance Fleet</span>
            <div className="ep-card__head-badges">
              <span className="ep-badge ep-badge--green">{availableAmb} Available</span>
              <span className="ep-badge ep-badge--blue">{dispatchedAmb} En Route</span>
            </div>
          </div>
          <div className="ep-amb-list">
            {ambulances.map(a => (
              <div key={a.id} className={`ep-amb-card ep-amb-card--${a.status}`}>
                <div className="ep-amb-card__top">
                  <span className="ep-amb-card__id">{a.id}</span>
                  <span className={`ep-amb-status ep-amb-status--${a.status}`}>
                    {a.status === "available" ? "✅ Available" : a.status === "dispatched" ? "🔵 En Route" : "🔧 Maintenance"}
                  </span>
                </div>
                <div className="ep-amb-card__driver">👤 {a.driver}</div>
                <div className="ep-amb-card__phone">📱 {a.phone}</div>
                {a.status === "available"  && <div className="ep-amb-card__eta">ETA: {a.eta}</div>}
                {a.status === "available"  && (
                  <button className="ep-btn ep-btn--sm ep-btn--full ep-btn--green" onClick={() => handleDispatch(a)}>
                    🚑 Dispatch Now
                  </button>
                )}
                {a.status === "dispatched" && (
                  <button className="ep-btn ep-btn--sm ep-btn--full ep-btn--recall" onClick={() => handleRecall(a)}>
                    ↩ Recall Ambulance
                  </button>
                )}
                {a.status === "maintenance" && (
                  <button className="ep-btn ep-btn--sm ep-btn--full ep-btn--disabled" disabled>
                    🔧 Under Maintenance
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="ep-card ep-card--quick">
          <div className="ep-card__head">
            <span className="ep-card__title">⚙️ Quick Actions</span>
          </div>
          <div className="ep-quick-grid">
            {[
              { icon: "🔔", label: "Alert All Staff",   action: () => pushNotif("All staff alerted via PA system", "danger") },
              { icon: "🩺", label: "Call On-Call Doc",  action: () => pushNotif("Connecting to on-call physician…", "info") },
              { icon: "🏥", label: "ICU Bed Status",    action: () => pushNotif("ICU: 3 beds available, 2 on hold", "info") },
              { icon: "💉", label: "Blood Bank",        action: () => pushNotif("Blood bank: O+ available (8 units)", "success") },
              { icon: "🔬", label: "Lab Rush Order",    action: () => pushNotif("Urgent lab order dispatched", "success") },
              { icon: "🚒", label: "Fire / Evacuation", action: () => pushNotif("⚠️ Fire drill protocol initiated", "warn") },
            ].map((q, i) => (
              <button key={i} className="ep-quick-btn" onClick={q.action}>
                <span className="ep-quick-btn__icon">{q.icon}</span>
                <span className="ep-quick-btn__label">{q.label}</span>
              </button>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="ep-footer">
        <span> CareSynce Hospital · Emergency Systems v3.2</span>
        <span>All activity is logged and monitored 24/7</span>
      </footer>
    </div>
  );
}