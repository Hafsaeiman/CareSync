import "./DoctorsPage.css";
import { useState } from "react";

const doctors = [
  { id:1,  name:"Dr. Sarah Ahmed",   spec:"Cardiologist",      exp:"10 Years", shift:"9 AM – 4 PM",  avail:"Available Today",    av:"av1",  initials:"SA" },
  { id:2,  name:"Dr. Ali Khan",       spec:"Neurologist",        exp:"7 Years",  shift:"2 PM – 9 PM",  avail:"Busy",               av:"av2",  initials:"AK" },
  { id:3,  name:"Dr. Ayesha Malik",   spec:"Dermatologist",      exp:"5 Years",  shift:"10 AM – 6 PM", avail:"Available Tomorrow",  av:"av3",  initials:"AM" },
  { id:4,  name:"Dr. Hamza Sheikh",   spec:"Orthopedic Surgeon", exp:"12 Years", shift:"8 AM – 3 PM",  avail:"Available Today",    av:"av4",  initials:"HS" },
  { id:5,  name:"Dr. Fatima Noor",    spec:"Pediatrician",       exp:"6 Years",  shift:"11 AM – 7 PM", avail:"Available",          av:"av5",  initials:"FN" },
  { id:6,  name:"Dr. Bilal Hussain",  spec:"ENT Specialist",     exp:"9 Years",  shift:"1 PM – 8 PM",  avail:"On Leave",           av:"av6",  initials:"BH" },
  { id:7,  name:"Dr. Hina Tariq",     spec:"Gynecologist",       exp:"11 Years", shift:"9 AM – 5 PM",  avail:"Available Today",    av:"av7",  initials:"HT" },
  { id:8,  name:"Dr. Usman Raza",     spec:"Psychiatrist",       exp:"8 Years",  shift:"4 PM – 10 PM", avail:"Busy",               av:"av8",  initials:"UR" },
  { id:9,  name:"Dr. Sana Javed",     spec:"Dentist",            exp:"4 Years",  shift:"10 AM – 4 PM", avail:"Available",          av:"av9",  initials:"SJ" },
  { id:10, name:"Dr. Zain Ali",       spec:"General Physician",  exp:"13 Years", shift:"7 AM – 2 PM",  avail:"Available Today",    av:"av10", initials:"ZA" },
];

const navItems = [
  { key:"profile",      icon:"👤", label:"Profile"               },
  { key:"availability", icon:"🟢", label:"Availability"          },
  { key:"shift",        icon:"🗓",  label:"Shift Table"           },
  { key:"appointment",  icon:"📋", label:"Book Appointment"      },
  { key:"prescription", icon:"💊", label:"Prescription"          },
  { key:"reports",      icon:"📄", label:"Medical Reports"       },
  { key:"emergency",    icon:"🚨", label:"Emergency"             },
];

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

function availClass(a) {
  if (a === "Available Today" || a === "Available") return "av-today";
  if (a === "Busy")             return "av-busy";
  if (a === "On Leave")         return "av-leave";
  if (a === "Available Tomorrow") return "av-tomorrow";
  return "av-avail";
}
function availDot(a) {
  if (a === "Available Today" || a === "Available") return "#5a9e6e";
  if (a === "Busy")   return "#c05030";
  if (a === "On Leave") return "#9D9F97";
  return "#697F93";
}

/* ─────────────────────────────────── */
export default function DoctorsPage() {
  const [selected, setSelected]   = useState(null);
  const [section,  setSection]    = useState("profile");

  const select = (id) => { setSelected(doctors.find(d => d.id === id)); setSection("profile"); };
  const clear  = ()   => setSelected(null);

  const downloadReport = () => {
    const text = `PATIENT MEDICAL REPORT\n──────────────────────\nPatient: Ahmed Raza\nDoctor: ${selected?.name}\nDept:   ${selected?.spec}\nDiagnosis: Blood Pressure Stable\nMedicines: Paracetamol, Vitamin D\nNext Appt: 15 June 2026\n──────────────────────\nMedPanel HMS`;
    const a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
    a.download = "Medical_Report.txt";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <div className="wrap">

      {/* ── Sidebar ── */}
      <div className="sb">
        <div className="sb-logo">
          <div className="sb-logo-icon">🏥</div>
          <div>
            <div className="sb-logo-text">MedPanel</div>
            <div className="sb-logo-sub">Hospital System</div>
          </div>
        </div>

        <div className="nav-label">Navigation</div>

        {navItems.map(({ key, icon, label }) => (
          <div key={key} className={`ni ${section === key ? "active" : ""}`} onClick={() => setSection(key)}>
            <div className="icon">{icon}</div>
            <span>{label}</span>
            {key === "emergency" && <span className="ni-dot" />}
          </div>
        ))}
      </div>

      {/* ── Main ── */}
      <div className="main">

        {/* Topbar */}
        <div className="topbar">
          {!selected ? (
            <>
              <div>
                <div className="topbar-title">Physician Directory</div>
                <div className="topbar-sub">Select a doctor to open their panel</div>
              </div>
              <div className="topbar-right">
                <span className="tb-badge">🏥 {doctors.length} Doctors</span>
              </div>
            </>
          ) : (
            <>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div className={`dc-avatar ${selected.av}`} style={{ width:44, height:44, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:"#fff", flexShrink:0 }}>
                  {selected.initials}
                </div>
                <div>
                  <div className="topbar-title">{selected.name}</div>
                  <div className="topbar-sub">{selected.spec} · {selected.shift}</div>
                </div>
              </div>
              <div className="topbar-right">
                <span className={`tb-badge dc-avail ${availClass(selected.avail)}`} style={{ padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:500 }}>
                  {selected.avail}
                </span>
                <button className="tb-btn" onClick={clear}>← Change Doctor</button>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="content">
          {!selected ? (
            <DoctorDirectory doctors={doctors} onSelect={select} />
          ) : (
            <PanelView section={section} doctor={selected} onDownload={downloadReport} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Directory ── */
function DoctorDirectory({ doctors, onSelect }) {
  return (
    <div className="fade-up">
      <div className="sec-head">
        <h2>Physician Directory</h2>
        <p>Choose a doctor to access their dashboard and patient tools</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ background:"rgba(65,83,101,.1)", fontSize:20 }}>👨‍⚕️</div>
          <div className="stat-val">10</div>
          <div className="stat-label">Total Doctors</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background:"rgba(90,158,110,.1)", fontSize:20 }}>✅</div>
          <div className="stat-val">6</div>
          <div className="stat-label">Available Now</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background:"rgba(200,121,65,.1)", fontSize:20 }}>⏳</div>
          <div className="stat-val">2</div>
          <div className="stat-label">Currently Busy</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background:"rgba(142,110,181,.1)", fontSize:20 }}>🗓</div>
          <div className="stat-val">48</div>
          <div className="stat-label">Appointments Today</div>
        </div>
      </div>

      <div className="doctor-grid">
        {doctors.map(d => (
          <div key={d.id} className="dc" onClick={() => onSelect(d.id)}>
            <div className={`dc-avatar ${d.av}`}>{d.initials}</div>
            <div className="dc-name">{d.name}</div>
            <div className="dc-spec">{d.spec}</div>
            <div className={`dc-avail ${availClass(d.avail)}`}>
              <div className="avail-dot" style={{ background: availDot(d.avail) }} />
              {d.avail}
            </div>
            <button className="dc-btn">Open Panel →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Panel view router ── */
function PanelView({ section, doctor, onDownload }) {
  const sections = { profile: Profile, availability: Availability, shift: ShiftTable, appointment: Appointment, prescription: Prescription, reports: Reports, emergency: Emergency };
  const Component = sections[section] || Profile;
  return (
    <div className="fade-up">
      <div className="sec-head">
        <h2>{{ profile:"Doctor Profile", availability:"Availability", shift:"Shift Schedule", appointment:"Book Appointment", prescription:"Prescription Form", reports:"Medical Reports", emergency:"Emergency Notifications" }[section]}</h2>
      </div>
      <div className="panel">
        <Component doctor={doctor} onDownload={onDownload} />
      </div>
    </div>
  );
}

/* ── Profile ── */
function Profile({ doctor }) {
  return (
    <>
      <div style={{ display:"flex", alignItems:"center", gap:16, paddingBottom:20, borderBottom:"1px solid var(--border)", marginBottom:4 }}>
        <div className={`dc-avatar ${doctor.av}`} style={{ width:64, height:64, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#fff" }}>
          {doctor.initials}
        </div>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"var(--pearl)" }}>{doctor.name}</div>
          <div style={{ fontSize:13, color:"var(--pave)", marginTop:3 }}>{doctor.spec}</div>
          <div className={`dc-avail ${availClass(doctor.avail)}`} style={{ marginTop:8, display:"inline-flex" }}>
            <div className="avail-dot" style={{ background: availDot(doctor.avail) }} />
            {doctor.avail}
          </div>
        </div>
      </div>
      <div className="info-grid">
        {[["Experience", doctor.exp], ["Department", doctor.spec], ["Shift Hours", doctor.shift], ["Status", doctor.avail]].map(([label, val]) => (
          <div key={label} className="ic">
            <div className="ic-label">{label}</div>
            <div className="ic-val">{val}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Availability ── */
function Availability({ doctor }) {
  return (
    <div className="avail-big">
      <div className="avail-big-dot" style={{ background: availDot(doctor.avail), width:16, height:16 }} />
      <div>
        <div className="avail-big-text">{doctor.avail}</div>
        <div style={{ fontSize:13, color:"var(--pave)", marginTop:4 }}>Shift: {doctor.shift}</div>
      </div>
    </div>
  );
}

/* ── Shift Table ── */
function ShiftTable({ doctor }) {
  return (
    <table className="styled-table">
      <thead>
        <tr><th>Day</th><th>Shift Timing</th><th>Status</th></tr>
      </thead>
      <tbody>
        {DAYS.map(day => (
          <tr key={day}>
            <td style={{ fontWeight:500 }}>{day}</td>
            <td>{doctor.shift}</td>
            <td>
              <div className={`dc-avail ${availClass(doctor.avail)}`} style={{ display:"inline-flex" }}>
                <div className="avail-dot" style={{ background: availDot(doctor.avail) }} />
                {doctor.avail}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ── Appointment ── */
function Appointment() {
  return (
    <div className="form-grid">
      <div className="form-full"><div className="field-label">Patient Name</div><input className="fi" type="text" placeholder="Enter full name" /></div>
      <div><div className="field-label">Date</div><input className="fi" type="date" /></div>
      <div><div className="field-label">Time</div><input className="fi" type="time" /></div>
      <div><div className="field-label">Reason for Visit</div><input className="fi" type="text" placeholder="Brief description" /></div>
      <div><div className="field-label">Contact Number</div><input className="fi" type="tel" placeholder="+92 300 0000000" /></div>
      <div className="form-full"><button className="form-btn">Confirm Appointment →</button></div>
    </div>
  );
}

/* ── Prescription ── */
function Prescription() {
  return (
    <div className="form-grid">
      <div className="form-full"><div className="field-label">Patient Name</div><input className="fi" type="text" placeholder="Enter patient name" /></div>
      <div><div className="field-label">Age</div><input className="fi" type="number" placeholder="Age" /></div>
      <div><div className="field-label">Diagnosis</div><input className="fi" type="text" placeholder="Enter diagnosis" /></div>
      <div className="form-full"><div className="field-label">Prescription</div><textarea className="fi" rows={7} placeholder="Medicines, dosage, instructions…" /></div>
      <div className="form-full"><button className="form-btn">Save Prescription →</button></div>
    </div>
  );
}

/* ── Reports ── */
function Reports({ doctor, onDownload }) {
  return (
    <div className="report-card">
      <div className="report-patient">Ahmed Raza</div>
      {[["Doctor", doctor.name], ["Department", doctor.spec], ["Diagnosis", "Blood Pressure Stable"], ["Medicines", "Paracetamol, Vitamin D"], ["Next Appointment", "15 June 2026"]].map(([k, v]) => (
        <div key={k} className="report-row"><span>{k}</span><span>{v}</span></div>
      ))}
      <div className="report-btns">
        <button className="btn-dl" onClick={onDownload}>⬇ Download Report</button>
        <button className="btn-view">👁 View Full Report</button>
      </div>
    </div>
  );
}

/* ── Emergency ── */
function Emergency() {
  return (
    <>
      <div className="emerg-alert">
        <div className="emerg-icon">🚨</div>
        <div>
          <div className="emerg-title">ICU Alert — Immediate Attention Required</div>
          <div className="emerg-body">Emergency patient has arrived in the ICU. All available physicians are requested to respond immediately.</div>
        </div>
      </div>
      <div className="emerg-alert" style={{ marginTop:12, borderLeftColor:"var(--prince)" }}>
        <div className="emerg-icon">⚠️</div>
        <div>
          <div className="emerg-title">High Priority — Room 204</div>
          <div className="emerg-body">Patient vitals dropping. Cardiac team requested on standby.</div>
        </div>
      </div>
    </>
  );
}