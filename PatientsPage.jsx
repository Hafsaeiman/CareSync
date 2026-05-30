import { useState, useCallback } from "react";
import "./PatientsPage.css";

// ── DATA ──────────────────────────────────────────────────────────────────────
const INITIAL_PATIENTS = [
  {
    id:"P-00421",name:"Ali Khan",age:24,dob:"14 March 2001",gender:"Male",
    bloodGroup:"B+",weight:"72 kg",height:"5'9\"",
    photo:"https://i.pravatar.cc/150?img=11",
    phone:"+92 300 1234567",email:"ali.khan@email.com",
    address:"House 12, Street 4, G-9, Islamabad",
    emergencyContact:"Umar Khan — Brother — +92 312 9876543",
    primaryDisease:"Type 2 Diabetes",status:"Stable",
    ward:"General Ward B",bed:"Bed 14",admittedOn:"02 May 2026",
    doctor:"Dr. Sarah Ahmed",specialty:"Endocrinology",nextAppointment:"28 May 2026",
    allergies:["Penicillin","Sulfa Drugs"],
    chronicConditions:["Hypertension","Obesity"],
    vitals:{bp:"128/84 mmHg",sugar:"162 mg/dL",pulse:"78 bpm",temp:"98.4°F",oxygen:"97%",lastUpdated:"Today, 08:30 AM"},
    medications:[
      {name:"Metformin",dose:"500mg",frequency:"Twice daily",refillDate:"30 May 2026"},
      {name:"Vitamin D3",dose:"1000 IU",frequency:"Once daily",refillDate:"15 Jun 2026"},
      {name:"Lisinopril",dose:"10mg",frequency:"Once daily",refillDate:"30 May 2026"},
    ],
    labReports:[
      {name:"HbA1c Test",date:"10 May 2026",result:"7.8%",status:"Abnormal"},
      {name:"Fasting Blood Sugar",date:"10 May 2026",result:"162 mg/dL",status:"High"},
      {name:"Lipid Profile",date:"01 May 2026",result:"Normal",status:"Normal"},
      {name:"CBC",date:"01 May 2026",result:"Normal",status:"Normal"},
    ],
    visitHistory:[
      {date:"02 May 2026",doctor:"Dr. Sarah Ahmed",notes:"Initial admission. Diabetes poorly controlled. Started Metformin.",type:"Admission"},
      {date:"08 May 2026",doctor:"Dr. Sarah Ahmed",notes:"Follow-up. Blood sugar improving. BP still elevated. Added Lisinopril.",type:"Follow-up"},
      {date:"12 May 2026",doctor:"Dr. Tariq Usman",notes:"Routine checkup. Vitals stable. Advised dietary changes.",type:"Checkup"},
    ],
    payments:[
      {description:"Consultation — Dr. Ahmed",date:"02 May 2026",amount:2500,status:"Paid"},
      {description:"Lab Tests (CBC, Lipid)",date:"01 May 2026",amount:3800,status:"Paid"},
      {description:"HbA1c & Blood Sugar",date:"10 May 2026",amount:2200,status:"Paid"},
      {description:"Ward Charges (May)",date:"01 May 2026",amount:15000,status:"Pending"},
      {description:"Medication Dispensed",date:"12 May 2026",amount:4500,status:"Pending"},
    ]
  },
  {
    id:"P-00422",name:"Sana Malik",age:34,dob:"07 August 1991",gender:"Female",
    bloodGroup:"A+",weight:"58 kg",height:"5'4\"",
    photo:"https://i.pravatar.cc/150?img=47",
    phone:"+92 321 7654321",email:"sana.malik@gmail.com",
    address:"Flat 3B, Gulberg Residency, Lahore",
    emergencyContact:"Tariq Malik — Husband — +92 333 1122334",
    primaryDisease:"Acute Appendicitis (Post-op)",status:"Stable",
    ward:"Surgical Ward A",bed:"Bed 6",admittedOn:"18 May 2026",
    doctor:"Dr. Kamran Baig",specialty:"Surgery",nextAppointment:"01 Jun 2026",
    allergies:["Aspirin","Latex"],
    chronicConditions:["Iron Deficiency Anemia"],
    vitals:{bp:"112/72 mmHg",sugar:"95 mg/dL",pulse:"74 bpm",temp:"99.1°F",oxygen:"98%",lastUpdated:"Today, 07:45 AM"},
    medications:[
      {name:"Cefazolin",dose:"1g IV",frequency:"Every 8 hours",refillDate:"25 May 2026"},
      {name:"Paracetamol",dose:"500mg",frequency:"Every 6 hours PRN",refillDate:"28 May 2026"},
      {name:"Ferrous Sulfate",dose:"200mg",frequency:"Once daily",refillDate:"15 Jun 2026"},
    ],
    labReports:[
      {name:"WBC Count",date:"18 May 2026",result:"14,200/µL",status:"High"},
      {name:"CRP",date:"18 May 2026",result:"82 mg/L",status:"Abnormal"},
      {name:"Post-op CBC",date:"21 May 2026",result:"Normal",status:"Normal"},
    ],
    visitHistory:[
      {date:"18 May 2026",doctor:"Dr. Kamran Baig",notes:"Admitted with acute RLQ pain, fever, elevated WBC. Appendicitis confirmed.",type:"Admission"},
      {date:"19 May 2026",doctor:"Dr. Kamran Baig",notes:"Laparoscopic appendectomy performed successfully. No complications.",type:"Checkup"},
    ],
    payments:[
      {description:"Emergency Consultation",date:"18 May 2026",amount:3500,status:"Paid"},
      {description:"Appendectomy (Surgery Fee)",date:"19 May 2026",amount:85000,status:"Paid"},
      {description:"Surgical Ward — 5 Days",date:"18 May 2026",amount:25000,status:"Pending"},
    ]
  },
  {
    id:"P-00423",name:"Hassan Raza",age:58,dob:"15 November 1967",gender:"Male",
    bloodGroup:"O+",weight:"89 kg",height:"5'11\"",
    photo:"https://i.pravatar.cc/150?img=68",
    phone:"+92 345 9988776",email:"hassan.raza@hotmail.com",
    address:"House 77, Model Town, Lahore",
    emergencyContact:"Ayesha Raza — Wife — +92 300 5544332",
    primaryDisease:"Coronary Artery Disease (Unstable Angina)",status:"Under Observation",
    ward:"CCU Ward",bed:"Bed 2",admittedOn:"20 May 2026",
    doctor:"Dr. Nadia Qureshi",specialty:"Cardiology",nextAppointment:"27 May 2026",
    allergies:["Codeine","NSAIDs"],
    chronicConditions:["Hypertension","Hypercholesterolemia","Type 2 Diabetes"],
    vitals:{bp:"148/92 mmHg",sugar:"178 mg/dL",pulse:"88 bpm",temp:"98.8°F",oxygen:"95%",lastUpdated:"Today, 09:00 AM"},
    medications:[
      {name:"Aspirin",dose:"75mg",frequency:"Once daily",refillDate:"20 Jun 2026"},
      {name:"Clopidogrel",dose:"75mg",frequency:"Once daily",refillDate:"20 Jun 2026"},
      {name:"Atorvastatin",dose:"40mg",frequency:"Once at night",refillDate:"20 Jun 2026"},
    ],
    labReports:[
      {name:"Troponin I",date:"20 May 2026",result:"0.08 ng/mL",status:"Abnormal"},
      {name:"ECG",date:"20 May 2026",result:"ST depression V4-V6",status:"Abnormal"},
      {name:"Echocardiogram",date:"22 May 2026",result:"EF 48%, mild LV dysfunction",status:"Abnormal"},
    ],
    visitHistory:[
      {date:"20 May 2026",doctor:"Dr. Nadia Qureshi",notes:"Admitted with chest tightness. Troponin mildly elevated. Continuous cardiac monitoring started.",type:"Admission"},
      {date:"23 May 2026",doctor:"Dr. Nadia Qureshi",notes:"Coronary angiography performed. Significant stenosis in LAD (70%). Considering elective PCI.",type:"Checkup"},
    ],
    payments:[
      {description:"CCU Admission",date:"20 May 2026",amount:5000,status:"Paid"},
      {description:"Echocardiogram",date:"22 May 2026",amount:8500,status:"Paid"},
      {description:"Coronary Angiography",date:"23 May 2026",amount:45000,status:"Pending"},
      {description:"CCU Ward — Daily (×5)",date:"20 May 2026",amount:40000,status:"Pending"},
    ]
  },
  {
    id:"P-00424",name:"Ayesha Noor",age:19,dob:"03 March 2007",gender:"Female",
    bloodGroup:"AB+",weight:"51 kg",height:"5'2\"",
    photo:"https://i.pravatar.cc/150?img=44",
    phone:"+92 311 2233445",email:"ayesha.noor@edu.pk",
    address:"Hostel Block C, Quaid-e-Azam University, Islamabad",
    emergencyContact:"Noor ul Huda — Mother — +92 300 8877665",
    primaryDisease:"Community-Acquired Pneumonia",status:"Stable",
    ward:"General Ward A",bed:"Bed 21",admittedOn:"22 May 2026",
    doctor:"Dr. Farhan Siddiqui",specialty:"Pulmonology",nextAppointment:"29 May 2026",
    allergies:["Amoxicillin"],
    chronicConditions:["Mild Asthma"],
    vitals:{bp:"108/68 mmHg",sugar:"88 mg/dL",pulse:"92 bpm",temp:"100.6°F",oxygen:"93%",lastUpdated:"Today, 10:15 AM"},
    medications:[
      {name:"Levofloxacin",dose:"750mg IV",frequency:"Once daily",refillDate:"28 May 2026"},
      {name:"Prednisolone",dose:"40mg",frequency:"Once daily",refillDate:"28 May 2026"},
      {name:"Salbutamol Nebuliser",dose:"2.5mg",frequency:"Every 6 hours",refillDate:"26 May 2026"},
    ],
    labReports:[
      {name:"CBC",date:"22 May 2026",result:"WBC 12,800, Left shift",status:"Abnormal"},
      {name:"Chest X-Ray",date:"22 May 2026",result:"Consolidation in right lower lobe",status:"Abnormal"},
      {name:"ABG",date:"23 May 2026",result:"pO2 72 mmHg — mild hypoxia",status:"High"},
    ],
    visitHistory:[
      {date:"22 May 2026",doctor:"Dr. Farhan Siddiqui",notes:"Admitted with 5-day history of fever, productive cough. Chest X-ray confirms right lower lobe pneumonia.",type:"Admission"},
      {date:"24 May 2026",doctor:"Dr. Farhan Siddiqui",notes:"Temperature trending down. Less tachycardia. Plan to transition to oral antibiotics if improving by day 4.",type:"Checkup"},
    ],
    payments:[
      {description:"Consultation — Dr. Siddiqui",date:"22 May 2026",amount:2800,status:"Paid"},
      {description:"Chest X-Ray & CBC",date:"22 May 2026",amount:5100,status:"Paid"},
      {description:"Ward Charges — Daily (×3)",date:"22 May 2026",amount:12000,status:"Pending"},
    ]
  },
  {
    id:"P-00425",name:"Imran Chaudhry",age:45,dob:"20 June 1980",gender:"Male",
    bloodGroup:"B−",weight:"95 kg",height:"5'10\"",
    photo:"https://i.pravatar.cc/150?img=57",
    phone:"+92 333 5566778",email:"imran.c@businessmail.pk",
    address:"House 8, DHA Phase 2, Rawalpindi",
    emergencyContact:"Fariha Imran — Wife — +92 321 4433221",
    primaryDisease:"Chronic Kidney Disease Stage 3",status:"Under Observation",
    ward:"Nephrology Ward",bed:"Bed 9",admittedOn:"15 May 2026",
    doctor:"Dr. Zainab Mirza",specialty:"Nephrology",nextAppointment:"30 May 2026",
    allergies:["Contrast Dye","Ibuprofen"],
    chronicConditions:["Hypertension","Type 2 Diabetes","Dyslipidemia"],
    vitals:{bp:"154/98 mmHg",sugar:"194 mg/dL",pulse:"82 bpm",temp:"98.2°F",oxygen:"96%",lastUpdated:"Today, 06:50 AM"},
    medications:[
      {name:"Amlodipine",dose:"10mg",frequency:"Once daily",refillDate:"15 Jun 2026"},
      {name:"Losartan",dose:"100mg",frequency:"Once daily",refillDate:"15 Jun 2026"},
      {name:"Insulin Glargine",dose:"20 units",frequency:"Once at night",refillDate:"10 Jun 2026"},
    ],
    labReports:[
      {name:"Serum Creatinine",date:"15 May 2026",result:"2.8 mg/dL",status:"Abnormal"},
      {name:"eGFR",date:"15 May 2026",result:"28 mL/min",status:"Abnormal"},
      {name:"Serum Potassium",date:"18 May 2026",result:"5.6 mEq/L",status:"High"},
    ],
    visitHistory:[
      {date:"15 May 2026",doctor:"Dr. Zainab Mirza",notes:"Admitted with worsening pedal edema, fatigue and declining renal function. CKD Stage 3B.",type:"Admission"},
      {date:"23 May 2026",doctor:"Dr. Zainab Mirza",notes:"Creatinine stable at 2.6. Edema reduced. Plan to discharge if stable over next 48 hours.",type:"Checkup"},
    ],
    payments:[
      {description:"Nephrology Consultation",date:"15 May 2026",amount:4500,status:"Paid"},
      {description:"Renal Function Panel",date:"15 May 2026",amount:7800,status:"Paid"},
      {description:"Nephrology Ward — 10 Days",date:"15 May 2026",amount:50000,status:"Pending"},
    ]
  },
];

const today = new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
const SECTIONS = ["Overview","Vitals","Medications","Lab Reports","Visit History","Billing"];

function genId(patients) {
  const max = patients.reduce((m,p)=>Math.max(m,parseInt(p.id.replace("P-",""))||0),420);
  return "P-"+String(max+1).padStart(5,"0");
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function statusClass(s) {
  if (s==="Stable") return "pp-badge--stable";
  if (s==="Critical") return "pp-badge--danger";
  return "pp-badge--warn";
}
function cardClass(s) {
  if (s==="Stable") return "pp-card--stable";
  if (s==="Critical") return "pp-card--danger";
  return "pp-card--warn";
}
function labClass(s) {
  if (s==="Normal") return "pp-lab--normal";
  if (s==="High") return "pp-lab--high";
  return "pp-lab--abnormal";
}

// ── SMALL SHARED ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  return (
    <span className={`pp-badge ${statusClass(status)}`}>
      <span className="pp-badge-dot"/>
      {status}
    </span>
  );
}
function LabBadge({ status }) {
  return <span className={`pp-lab-badge ${labClass(status)}`}>{status}</span>;
}
function Tag({ label, variant }) {
  return <span className={`pp-tag pp-tag--${variant}`}>{label}</span>;
}
function Empty() { return <span className="pp-empty">No records found</span>; }

// ── SEARCH MODAL ──────────────────────────────────────────────────────────────
function SearchModal({ patients, onOpen, onRegister, onClose }) {
  const [pid, setPid] = useState("");
  const [err, setErr] = useState("");

  const handleSearch = () => {
    const found = patients.find(p => p.id.toUpperCase() === pid.trim().toUpperCase());
    if (found) { setErr(""); onOpen(found.id); }
    else setErr("No patient found with that ID. Please check and try again.");
  };

  return (
    <div className="pp-overlay">
      <div className="pp-search-modal">
        <div className="pp-modal-accent"/>
        <div className="pp-modal-body">
          <div className="pp-modal-eyebrow">
            Patient Lookup
            <button className="pp-modal-close" onClick={onClose}>✕</button>
          </div>
          <div className="pp-modal-title">Open Patient Record</div>
          <div className="pp-modal-sub">Enter a Patient ID to load the full medical profile</div>

          <div className="pp-modal-input-wrap">
            <span className="pp-modal-input-icon">🔍</span>
            <input
              value={pid}
              onChange={e=>{setPid(e.target.value);setErr("");}}
              onKeyDown={e=>e.key==="Enter"&&handleSearch()}
              placeholder="e.g.  P-00421"
              className={`pp-modal-input${err?" pp-modal-input--err":""}`}
            />
          </div>

          {err && <div className="pp-modal-error">⚠ {err}</div>}

          <div className="pp-modal-btns">
            <button className="pp-modal-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="pp-modal-btn-open" onClick={handleSearch}>Open Profile →</button>
          </div>

          <div className="pp-modal-divider">
            <div className="pp-modal-divider-line"/>or<div className="pp-modal-divider-line"/>
          </div>

          <button className="pp-modal-btn-register" onClick={onRegister}>
            ＋ Register New Patient
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ADD PATIENT MODAL ─────────────────────────────────────────────────────────
function AddPatientModal({ patients, onAdd, onClose }) {
  const [form, setForm] = useState({
    name:"",dob:"",age:"",gender:"Male",bloodGroup:"",weight:"",height:"",
    phone:"",email:"",address:"",emergencyContact:"",
    primaryDisease:"",ward:"",bed:"",doctor:"",specialty:"",nextAppointment:"",
    status:"Stable",allergies:"",chronicConditions:"",notes:""
  });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleAdd = () => {
    if (!form.name.trim()) { alert("Please enter patient name."); return; }
    const np = {
      id: genId(patients),
      name: form.name, age: parseInt(form.age)||0, dob: form.dob, gender: form.gender,
      bloodGroup: form.bloodGroup, weight: form.weight, height: form.height,
      photo: `https://i.pravatar.cc/150?img=${20+patients.length}`,
      phone: form.phone, email: form.email, address: form.address,
      emergencyContact: form.emergencyContact, primaryDisease: form.primaryDisease,
      status: form.status, ward: form.ward, bed: form.bed, doctor: form.doctor,
      specialty: form.specialty, nextAppointment: form.nextAppointment,
      admittedOn: today,
      allergies: form.allergies?form.allergies.split(",").map(s=>s.trim()).filter(Boolean):[],
      chronicConditions: form.chronicConditions?form.chronicConditions.split(",").map(s=>s.trim()).filter(Boolean):[],
      vitals:{bp:"—",sugar:"—",pulse:"—",temp:"—",oxygen:"—",lastUpdated:"Not recorded"},
      medications:[],labReports:[],
      visitHistory: form.notes?[{date:today,doctor:form.doctor||"Admitting Physician",notes:form.notes,type:"Admission"}]:[],
      payments:[]
    };
    onAdd(np);
  };

  const inp = (id, ph, type="text") => (
    <input type={type} value={form[id]} onChange={e=>set(id,e.target.value)}
      placeholder={ph} className="pp-add-input"/>
  );
  const sel = (id, opts) => (
    <select value={form[id]} onChange={e=>set(id,e.target.value)} className="pp-add-select">{opts}</select>
  );

  const STATUSES = ["Stable","Under Observation","Critical"];
  const GENDERS  = ["Male","Female","Other"];
  const SPECIALTIES = ["Cardiology","Endocrinology","Neurology","Orthopedics","Pulmonology","Nephrology","Gastroenterology","Oncology","Pediatrics","General Medicine","Surgery","Psychiatry"];

  const toggleStyle = (active, type) => {
    const base = { flex:1, padding:"10px 8px", borderRadius:"var(--radius-sm)", cursor:"pointer",
      fontFamily:"'Outfit',sans-serif", fontWeight:500, fontSize:".82rem", transition:"all .15s" };
    if (type === "gender") {
      return { ...base,
        background: active ? "rgba(105,127,147,.15)" : "var(--surface-2)",
        border: `1.5px solid ${active ? "var(--accent)" : "var(--border)"}`,
        color: active ? "var(--accent-hi)" : "var(--text-3)"
      };
    }
    const map = { Stable:["var(--stable-bg)","var(--stable-br)","var(--stable)"],
                  "Under Observation":["var(--warn-bg)","var(--warn-br)","var(--warn)"],
                  Critical:["var(--danger-bg)","var(--danger-br)","var(--danger)"] };
    const [bg,br,cl] = map[type]||["var(--surface-2)","var(--border)","var(--text-3)"];
    return { ...base,
      background: active ? bg : "var(--surface-2)",
      border: `1.5px solid ${active ? br : "var(--border)"}`,
      color: active ? cl : "var(--text-3)",
      fontSize:".73rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".05em"
    };
  };

  return (
    <div className="pp-overlay">
      <div className="pp-add-modal">
        <div className="pp-modal-accent"/>

        <div className="pp-add-header">
          <div>
            <div className="pp-modal-eyebrow" style={{justifyContent:"flex-start"}}>Patient Registration</div>
            <div className="pp-modal-title">New Patient Record</div>
            <div className="pp-modal-sub" style={{marginBottom:0}}>Fill in the details to register the patient</div>
          </div>
          <button className="pp-add-header-close" onClick={onClose}>✕</button>
        </div>

        <div className="pp-add-body">

          {/* Personal */}
          <div>
            <div className="pp-add-section-head">
              <div className="pp-add-section-icon">👤</div>
              <div>
                <div className="pp-add-section-title">Personal Information</div>
                <div className="pp-add-section-sub">Basic demographics and physical details</div>
              </div>
            </div>
            <div className="pp-grid-2">
              <div className="pp-col-2"><div className="pp-field-label">Full Name *</div>{inp("name","Patient's full name")}</div>
              <div><div className="pp-field-label">Date of Birth</div>{inp("dob","e.g. 10 Jan 1998")}</div>
              <div><div className="pp-field-label">Age</div>{inp("age","e.g. 26","number")}</div>
              <div><div className="pp-field-label">Blood Group</div>
                {sel("bloodGroup",<><option value="">Select blood group</option>{["A+","A−","B+","B−","O+","O−","AB+","AB−"].map(x=><option key={x}>{x}</option>)}</>)}
              </div>
              <div><div className="pp-field-label">Weight</div>{inp("weight","e.g. 65 kg")}</div>
              <div><div className="pp-field-label">Height</div>{inp("height","e.g. 5'6\"")}</div>
              <div className="pp-col-2">
                <div className="pp-field-label">Gender</div>
                <div className="pp-toggle-row">
                  {GENDERS.map(g=>(
                    <button key={g} onClick={()=>set("gender",g)} style={toggleStyle(form.gender===g,"gender")}>
                      {g==="Male"?"👨":g==="Female"?"👩":"🧑"} {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="pp-add-section-head">
              <div className="pp-add-section-icon">📞</div>
              <div>
                <div className="pp-add-section-title">Contact Information</div>
                <div className="pp-add-section-sub">Phone, email, address and emergency contact</div>
              </div>
            </div>
            <div className="pp-grid-2">
              <div><div className="pp-field-label">Phone Number</div>{inp("phone","+92 300 0000000")}</div>
              <div><div className="pp-field-label">Email Address</div>{inp("email","patient@email.com","email")}</div>
              <div className="pp-col-2"><div className="pp-field-label">Home Address</div>{inp("address","House No., Street, Sector, City")}</div>
              <div className="pp-col-2"><div className="pp-field-label">Emergency Contact</div>{inp("emergencyContact","Name — Relation — Phone")}</div>
            </div>
          </div>

          {/* Admission */}
          <div>
            <div className="pp-add-section-head">
              <div className="pp-add-section-icon">🏥</div>
              <div>
                <div className="pp-add-section-title">Admission Details</div>
                <div className="pp-add-section-sub">Ward, doctor, diagnosis and appointment</div>
              </div>
            </div>
            <div className="pp-grid-2">
              <div className="pp-col-2"><div className="pp-field-label">Primary Diagnosis *</div>{inp("primaryDisease","e.g. Type 2 Diabetes")}</div>
              <div><div className="pp-field-label">Ward</div>{inp("ward","e.g. General Ward A")}</div>
              <div><div className="pp-field-label">Bed No.</div>{inp("bed","e.g. Bed 5")}</div>
              <div><div className="pp-field-label">Attending Doctor</div>{inp("doctor","Dr. Full Name")}</div>
              <div><div className="pp-field-label">Specialty</div>
                {sel("specialty",<><option value="">Select specialty</option>{SPECIALTIES.map(x=><option key={x}>{x}</option>)}</>)}
              </div>
              <div><div className="pp-field-label">Next Appointment</div>{inp("nextAppointment","e.g. 01 Jun 2026")}</div>
              <div className="pp-col-2">
                <div className="pp-field-label">Patient Status</div>
                <div className="pp-toggle-row">
                  {STATUSES.map(s=>(
                    <button key={s} onClick={()=>set("status",s)} style={toggleStyle(form.status===s,s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div>
            <div className="pp-add-section-head">
              <div className="pp-add-section-icon">🩺</div>
              <div>
                <div className="pp-add-section-title">Medical History</div>
                <div className="pp-add-section-sub">Allergies, chronic conditions and initial notes</div>
              </div>
            </div>
            <div className="pp-grid-1">
              <div>
                <div className="pp-field-label">Known Allergies</div>
                {inp("allergies","e.g. Penicillin, Sulfa Drugs")}
                <div className="pp-hint">Separate multiple with commas</div>
              </div>
              <div>
                <div className="pp-field-label">Chronic Conditions</div>
                {inp("chronicConditions","e.g. Hypertension, Obesity")}
                <div className="pp-hint">Separate multiple with commas</div>
              </div>
              <div>
                <div className="pp-field-label">Initial Clinical Notes</div>
                <textarea rows={3} value={form.notes} onChange={e=>set("notes",e.target.value)}
                  placeholder="Brief summary of patient's condition on admission…"
                  className="pp-add-textarea"/>
              </div>
            </div>
          </div>
        </div>

        <div className="pp-add-footer">
          <span className="pp-add-footer-note">🔒 Data stored locally in this session</span>
          <div className="pp-add-footer-btns">
            <button className="pp-add-cancel" onClick={onClose}>Cancel</button>
            <button className="pp-add-submit" onClick={handleAdd}>Register Patient →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DETAIL SECTIONS ───────────────────────────────────────────────────────────
function Overview({ p }) {
  return (
    <div className="pp-overview-grid">
      <div className="pp-card-panel">
        <div className="pp-card-panel-header">
          <div>
            <div className="pp-card-panel-title">🩺 Allergies &amp; Conditions</div>
          </div>
        </div>
        <div className="pp-section-label">Known Allergies</div>
        <div className="pp-tags-row" style={{marginBottom:14}}>
          {p.allergies.length ? p.allergies.map(a=><Tag key={a} label={a} variant="allergy"/>) : <Empty/>}
        </div>
        <div className="pp-section-label">Chronic Conditions</div>
        <div className="pp-tags-row">
          {p.chronicConditions.length ? p.chronicConditions.map(c=><Tag key={c} label={c} variant="condition"/>) : <Empty/>}
        </div>
      </div>

      <div className="pp-card-panel">
        <div className="pp-card-panel-header">
          <div>
            <div className="pp-card-panel-title">❤️ Latest Vitals</div>
            <div className="pp-card-panel-sub">Updated: {p.vitals.lastUpdated}</div>
          </div>
        </div>
        <div className="pp-vitals-grid">
          {[["❤️","BP",p.vitals.bp],["🩸","Sugar",p.vitals.sugar],["💓","Pulse",p.vitals.pulse],["🌡️","Temp",p.vitals.temp],["💨","O₂",p.vitals.oxygen]].map(([ic,k,v])=>(
            <div key={k} className="pp-vital-tile">
              <div className="pp-vital-icon">{ic}</div>
              <div className="pp-vital-label">{k}</div>
              <div className="pp-vital-value">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pp-card-panel">
        <div className="pp-card-panel-header">
          <div className="pp-card-panel-title">💊 Active Medications</div>
        </div>
        {p.medications.length ? p.medications.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:i<p.medications.length-1?"1px solid var(--border)":"none"}}>
            <div>
              <div style={{fontSize:".85rem",fontWeight:500,color:"var(--text-1)"}}>{m.name}</div>
              <div style={{fontSize:".72rem",color:"var(--text-3)",marginTop:2}}>{m.dose} — {m.frequency}</div>
            </div>
            <span style={{fontSize:".7rem",color:"var(--accent-hi)"}}>Refill: {m.refillDate}</span>
          </div>
        )) : <Empty/>}
      </div>

      <div className="pp-card-panel">
        <div className="pp-card-panel-header">
          <div className="pp-card-panel-title">🧪 Recent Lab Results</div>
        </div>
        {p.labReports.length ? p.labReports.slice(0,4).map((r,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:i<Math.min(4,p.labReports.length)-1?"1px solid var(--border)":"none"}}>
            <div>
              <div style={{fontSize:".83rem",fontWeight:500,color:"var(--text-1)"}}>{r.name}</div>
              <div style={{fontSize:".7rem",color:"var(--text-3)",marginTop:2}}>{r.date}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
              <span style={{fontSize:".78rem",fontWeight:600,color:"var(--text-1)"}}>{r.result}</span>
              <LabBadge status={r.status}/>
            </div>
          </div>
        )) : <Empty/>}
      </div>
    </div>
  );
}

function VitalsSection({ p, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({...p.vitals});
  const FIELDS = [["bp","Blood Pressure","❤️"],["sugar","Blood Sugar","🩸"],["pulse","Pulse Rate","💓"],["temp","Temperature","🌡️"],["oxygen","O₂ Saturation","💨"]];
  const handleSave = () => { onSave({...form,lastUpdated:"Just now"}); setEditing(false); };

  return (
    <div className="pp-card-panel">
      <div className="pp-card-panel-header">
        <div>
          <div className="pp-card-panel-title">❤️ Patient Vitals</div>
          <div className="pp-card-panel-sub">Last updated: {p.vitals.lastUpdated}</div>
        </div>
        {!editing
          ? <button className="pp-edit-btn" onClick={()=>setEditing(true)}>✏ Update Vitals</button>
          : <div className="pp-btn-row">
              <button className="pp-save-btn" onClick={handleSave}>💾 Save</button>
              <button className="pp-x-btn" onClick={()=>{setEditing(false);setForm({...p.vitals});}}>✕</button>
            </div>
        }
      </div>
      <div className="pp-vitals-grid">
        {FIELDS.map(([k,l,ic])=>(
          <div key={k} className="pp-vital-tile">
            <span className="pp-vital-icon">{ic}</span>
            <span className="pp-vital-label">{l}</span>
            {editing
              ? <input value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} className="pp-vital-input"/>
              : <span className="pp-vital-value">{p.vitals[k]}</span>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

function MedicationsSection({ p }) {
  return (
    <div className="pp-card-panel">
      <div className="pp-card-panel-header">
        <div className="pp-card-panel-title">💊 Prescriptions &amp; Medications</div>
      </div>
      {p.medications.length ? (
        <>
          <div className="pp-table-head pp-table-meds">
            <span>Medication</span><span>Dose</span><span>Frequency</span><span>Refill By</span>
          </div>
          {p.medications.map((m,i)=>(
            <div key={i} className="pp-table-row pp-table-meds">
              <span style={{fontWeight:500}}>💉 {m.name}</span>
              <span style={{color:"var(--text-2)"}}>{m.dose}</span>
              <span style={{color:"var(--text-2)"}}>{m.frequency}</span>
              <span style={{color:"var(--accent-hi)",fontSize:".78rem"}}>{m.refillDate}</span>
            </div>
          ))}
        </>
      ) : <Empty/>}
    </div>
  );
}

function LabSection({ p }) {
  return (
    <div className="pp-card-panel">
      <div className="pp-card-panel-header">
        <div className="pp-card-panel-title">🧪 Lab Reports</div>
      </div>
      {p.labReports.length ? p.labReports.map((r,i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 0",borderBottom:i<p.labReports.length-1?"1px solid var(--border)":"none"}}>
          <div>
            <div style={{fontSize:".83rem",fontWeight:500,color:"var(--text-1)"}}>{r.name}</div>
            <div style={{fontSize:".7rem",color:"var(--text-3)",marginTop:2}}>{r.date}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:".78rem",fontWeight:600,color:"var(--text-1)"}}>{r.result}</span>
            <LabBadge status={r.status}/>
            <button style={{background:"rgba(105,127,147,.1)",border:"1px solid var(--border)",color:"var(--text-3)",padding:"6px 10px",borderRadius:8,cursor:"pointer",fontSize:".8rem"}}>⬇</button>
          </div>
        </div>
      )) : <Empty/>}
    </div>
  );
}

function HistorySection({ p, onAdd }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({doc:"",type:"Follow-up",notes:""});

  const handleAdd = () => {
    if (!form.doc.trim()||!form.notes.trim()) return;
    onAdd({date:today,doctor:form.doc,notes:form.notes,type:form.type});
    setEditing(false); setForm({doc:"",type:"Follow-up",notes:""});
  };

  return (
    <div className="pp-card-panel">
      <div className="pp-card-panel-header">
        <div className="pp-card-panel-title">📋 Visit History</div>
        {!editing
          ? <button className="pp-edit-btn" onClick={()=>setEditing(true)}>✏ Add Note</button>
          : <button className="pp-x-btn" onClick={()=>setEditing(false)}>✕</button>
        }
      </div>
      {editing && (
        <div className="pp-note-form">
          <input placeholder="Doctor name" value={form.doc} onChange={e=>setForm(f=>({...f,doc:e.target.value}))} className="pp-note-input"/>
          <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} className="pp-note-select">
            {["Admission","Follow-up","Checkup","Emergency"].map(x=><option key={x}>{x}</option>)}
          </select>
          <textarea rows={3} placeholder="Clinical notes…" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} className="pp-note-input" style={{resize:"vertical"}}/>
          <button className="pp-save-btn" onClick={handleAdd}>💾 Save Note</button>
        </div>
      )}
      <div className="pp-timeline">
        {p.visitHistory.length ? p.visitHistory.map((v,i)=>(
          <div key={i} className="pp-timeline-item">
            <div className="pp-timeline-dot"/>
            <div>
              <span className="pp-timeline-date">{v.date}</span>
              <span className="pp-timeline-type">{v.type}</span>
            </div>
            <div className="pp-timeline-doctor">👨‍⚕️ {v.doctor}</div>
            <div className="pp-timeline-notes">{v.notes}</div>
          </div>
        )) : <Empty/>}
      </div>
    </div>
  );
}

function BillingSection({ p, onPay }) {
  const totalBill = p.payments.reduce((s,x)=>s+x.amount,0);
  const totalPaid = p.payments.filter(x=>x.status==="Paid").reduce((s,x)=>s+x.amount,0);
  const totalPend = totalBill - totalPaid;

  return (
    <div className="pp-card-panel">
      <div className="pp-card-panel-header">
        <div className="pp-card-panel-title">💵 Billing &amp; Payments</div>
      </div>
      <div className="pp-billing-summary">
        <div className="pp-billing-tile" style={{borderColor:"var(--accent)"}}>
          <div className="pp-billing-tile-label">Total Charges</div>
          <div className="pp-billing-tile-val">Rs. {totalBill.toLocaleString()}</div>
        </div>
        <div className="pp-billing-tile" style={{borderColor:"var(--stable)"}}>
          <div className="pp-billing-tile-label">Amount Paid</div>
          <div className="pp-billing-tile-val">Rs. {totalPaid.toLocaleString()}</div>
        </div>
        <div className="pp-billing-tile" style={{borderColor:"var(--warn)"}}>
          <div className="pp-billing-tile-label">Balance Due</div>
          <div className="pp-billing-tile-val">Rs. {totalPend.toLocaleString()}</div>
        </div>
      </div>
      {p.payments.length ? (
        <>
          <div className="pp-table-head pp-table-bill">
            <span>Description</span><span>Date</span><span>Amount</span><span>Status</span><span/>
          </div>
          {p.payments.map((x,i)=>(
            <div key={i} className="pp-table-row pp-table-bill">
              <span>{x.description}</span>
              <span style={{color:"var(--text-3)",fontSize:".78rem"}}>{x.date}</span>
              <span style={{fontWeight:500}}>Rs. {x.amount.toLocaleString()}</span>
              <StatusBadge status={x.status==="Paid"?"Stable":"Under Observation"}/>
              {x.status==="Pending"
                ? <button className="pp-pay-btn" onClick={()=>onPay(i)}>Pay Now</button>
                : <span style={{color:"var(--stable)",textAlign:"center"}}>✓</span>}
            </div>
          ))}
        </>
      ) : <Empty/>}
    </div>
  );
}

// ── PROFILE VIEW ──────────────────────────────────────────────────────────────
function ProfileView({ patient, onBack, onUpdate }) {
  const [section, setSection] = useState("Overview");
  const p = patient;

  const handleVitalsSave  = v  => onUpdate({...p,vitals:v});
  const handleAddNote     = n  => onUpdate({...p,visitHistory:[n,...p.visitHistory]});
  const handlePay         = i  => {
    const payments = p.payments.map((x,idx)=>idx===i?{...x,status:"Paid"}:x);
    onUpdate({...p,payments});
  };

  return (
    <div className="pp-detail">
      <button className="pp-back-btn" onClick={onBack}>← Back to Registry</button>

      {/* Hero */}
      <div className="pp-detail-hero">
        <div className="pp-detail-hero-stripe"/>
        <div className="pp-detail-hero-left">
          <img src={p.photo||"https://i.pravatar.cc/150?img=20"} alt={p.name} className="pp-detail-avatar"/>
          <div style={{minWidth:0}}>
            <div className="pp-detail-name-row">
              <span className="pp-detail-name">{p.name}</span>
              <StatusBadge status={p.status}/>
              <Tag label={p.id} variant="id"/>
            </div>
            <div className="pp-detail-bio">
              <span>🎂 {p.dob||"—"} · {p.age} yrs · {p.gender}</span>
              <span>🩸 {p.bloodGroup||"—"}</span>
              <span>⚖ {p.weight||"—"}</span>
              <span>📏 {p.height||"—"}</span>
            </div>
            <div className="pp-detail-contact">
              <span>📞 {p.phone||"—"}</span>
              <span>✉ {p.email||"—"}</span>
              <span>📍 {p.address||"—"}</span>
            </div>
            {p.emergencyContact && (
              <div className="pp-detail-emergency">🚨 Emergency: {p.emergencyContact}</div>
            )}
          </div>
        </div>

        <div className="pp-detail-admit-card">
          {[["Primary Diagnosis",p.primaryDisease],["Admitted On",p.admittedOn],["Ward / Bed",`${p.ward||"—"} — ${p.bed||"—"}`],
            ["Attending Doctor",p.doctor||"—"],["Specialty",p.specialty||"—"],["Next Appointment",p.nextAppointment||"—"]
          ].map(([k,v])=>(
            <div key={k} className="pp-detail-admit-item">
              <div className="pp-detail-admit-label">{k}</div>
              <div className="pp-detail-admit-val">{v||"—"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Nav */}
      <div className="pp-tab-nav">
        {SECTIONS.map(s=>(
          <button key={s} onClick={()=>setSection(s)} className={`pp-tab${section===s?" pp-tab--active":""}`}>{s}</button>
        ))}
      </div>

      {section==="Overview"     && <Overview p={p}/>}
      {section==="Vitals"       && <VitalsSection p={p} onSave={handleVitalsSave}/>}
      {section==="Medications"  && <MedicationsSection p={p}/>}
      {section==="Lab Reports"  && <LabSection p={p}/>}
      {section==="Visit History"&& <HistorySection p={p} onAdd={handleAddNote}/>}
      {section==="Billing"      && <BillingSection p={p} onPay={handlePay}/>}
    </div>
  );
}

// ── LANDING (REGISTRY) ────────────────────────────────────────────────────────
function Landing({ patients, onOpenSearch, onOpen, onRegister }) {
  return (
    <div style={{maxWidth:1100, margin:"0 auto", fontFamily:"'Outfit', sans-serif"}}>

      {/* Hero */}
      <div className="pp-hero">
        <div className="pp-hero-left">
          <div className="pp-hero-eyebrow">Patient Management System</div>
          <h1>Patient <em>Registry</em></h1>
          <p className="pp-hero-sub">
            Search by Patient ID to open a full medical profile, or register a new patient into the system.
          </p>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <div className="pp-search-bar" onClick={onOpenSearch}>
            <span className="pp-search-icon">🔍</span>
            <span className="pp-search-placeholder">Search by Patient ID, e.g. P-00421…</span>
            <span className="pp-search-kbd">Open Profile</span>
          </div>
          <button className="pp-register-btn" onClick={onRegister}>＋ New Patient</button>
        </div>
      </div>

      {/* Grid label */}
      <div className="pp-grid-label">
        <span className="pp-grid-label-text">All Registered Patients</span>
        <span className="pp-count-pill">{patients.length} patients</span>
      </div>

      {/* Cards */}
      <div className="pp-grid">
        {patients.map(p=>(
          <div key={p.id}
            className={`pp-card ${cardClass(p.status)}`}
            onClick={()=>onOpen(p.id)}
          >
            <div className="pp-card-top">
              <img src={p.photo||"https://i.pravatar.cc/150?img=20"} alt={p.name} className="pp-card-avatar"/>
              <div style={{flex:1,minWidth:0}}>
                <div className="pp-card-name">{p.name}</div>
                <div className="pp-card-meta">{p.id} · {p.age} yrs · {p.gender}</div>
              </div>
              <StatusBadge status={p.status}/>
            </div>
            <div className="pp-card-details">
              {[["Diagnosis",p.primaryDisease||"—"],["Doctor",p.doctor||"—"],
                ["Ward / Bed",`${p.ward||"—"} · ${p.bed||"—"}`],["Admitted",p.admittedOn||"—"]
              ].map(([l,v])=>(
                <div key={l}>
                  <div className="pp-card-detail-label">{l}</div>
                  <div className="pp-card-detail-val">{v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function PatientsPage() {
  const [patients, setPatients]     = useState(INITIAL_PATIENTS);
  const [view, setView]             = useState("landing");
  const [currentId, setCurrentId]   = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const currentPatient = patients.find(p=>p.id===currentId);

  const openProfile = useCallback((id) => {
    setCurrentId(id);
    setView("profile");
    setShowSearch(false);
    setShowRegister(false);
    window.scrollTo({top:0,behavior:"smooth"});
  }, []);

  const handleAddPatient = (np) => {
    setPatients(prev=>[...prev,np]);
    openProfile(np.id);
    setShowRegister(false);
  };

  const handleUpdate = (updated) => {
    setPatients(prev=>prev.map(p=>p.id===updated.id?updated:p));
    setCurrentId(updated.id);
  };

  const goBack = () => { setView("landing"); setCurrentId(null); };

  return (
    <div className="pp-page">
      {view==="landing" && (
        <Landing
          patients={patients}
          onOpenSearch={()=>setShowSearch(true)}
          onOpen={openProfile}
          onRegister={()=>setShowRegister(true)}
        />
      )}
      {view==="profile" && currentPatient && (
        <ProfileView
          patient={currentPatient}
          onBack={goBack}
          onUpdate={handleUpdate}
        />
      )}

      {showSearch && (
        <SearchModal
          patients={patients}
          onOpen={openProfile}
          onRegister={()=>{setShowSearch(false);setShowRegister(true);}}
          onClose={()=>setShowSearch(false)}
        />
      )}
      {showRegister && (
        <AddPatientModal
          patients={patients}
          onAdd={handleAddPatient}
          onClose={()=>setShowRegister(false)}
        />
      )}
    </div>
  );
}