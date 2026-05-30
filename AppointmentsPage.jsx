import React, { useState, useEffect } from "react";
import './AppointmentsPage.css';

/* ── Sample booked appointments data ─────────────── */
const initialAppointments = [
  {
    id: 'APT-0041',
    patient: 'Sarah Mitchell',
    doctor: 'Dr. James Owens',
    department: 'Cardiology',
    date: 'Aug 24, 2025',
    time: '10:00 AM',
    reason: 'Routine Checkup',
    status: 'Confirmed',
  },
  {
    id: 'APT-0042',
    patient: 'David Reyes',
    doctor: 'Dr. Amara Patel',
    department: 'Neurology',
    date: 'Aug 25, 2025',
    time: '2:30 PM',
    reason: 'Follow-up',
    status: 'Pending',
  },
  {
    id: 'APT-0043',
    patient: 'Linda Chow',
    doctor: 'Dr. Susan Bones',
    department: 'Dermatology',
    date: 'Aug 26, 2025',
    time: '11:15 AM',
    reason: 'Skin Consultation',
    status: 'Confirmed',
  },
  {
    id: 'APT-0044',
    patient: 'Omar Hassan',
    doctor: 'Dr. Peter Walsh',
    department: 'Orthopedics',
    date: 'Aug 27, 2025',
    time: '9:00 AM',
    reason: 'Knee Pain',
    status: 'Cancelled',
  },
  {
    id: 'APT-0045',
    patient: 'Priya Nair',
    doctor: 'Dr. Clara Voss',
    department: 'Pediatrics',
    date: 'Aug 28, 2025',
    time: '3:00 PM',
    reason: 'Vaccination',
    status: 'Confirmed',
  },
  {
    id: 'APT-0046',
    patient: 'Tom Bergmann',
    doctor: 'Dr. Yusuf Ali',
    department: 'Cardiology',
    date: 'Aug 29, 2025',
    time: '1:00 PM',
    reason: 'ECG Review',
    status: 'Pending',
  },
];

const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Dermatology',
  'Orthopedics',
  'Pediatrics',
  'General Medicine',
  'Psychiatry',
  'Radiology',
];

const REASONS = [
  'Routine Checkup',
  'Follow-up',
  'Emergency',
  'Consultation',
  'Lab Results Review',
  'Vaccination',
  'Other',
];

const STATUS_COLORS = {
  Confirmed: 'status-confirmed',
  Pending: 'status-pending',
  Cancelled: 'status-cancelled',
};

/* ── Component ───────────────────────────────────── */
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    medicalRecord: '',
    reason: '',
    department: '',
    date: '',
    time: '',
  });
  useEffect(() => {

  fetch("http://localhost:5000/api/appointments")
    .then((res) => res.json())
    .then((data) => {

      if (Array.isArray(data) && data.length > 0) {

        const formattedAppointments = data.map((item) => ({
          id: item._id || `APT-${Date.now()}`,
          patient: item.patientName,
          doctor: item.doctorName || 'Dr. Susan Bones',
          department: item.department,
          date: item.appointmentDate,
          time: item.appointmentTime,
          reason: item.reason,
          status: item.status || 'Pending',
        }));
        setAppointments(formattedAppointments);
      }
    })
    .catch((err) => console.log(err));

}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await fetch(
      "http://localhost:5000/api/appointments",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          patientName: form.name,
          phone: form.phone,
          medicalRecord: form.medicalRecord,
          reason: form.reason,
          department: form.department,
          appointmentDate: form.date,
          appointmentTime: form.time
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    const newApt = {
      id: data.id || `APT-${Date.now()}`,
      patient: form.name,
      doctor: "Dr. Susan Bones",
      department: form.department,
      date: form.date,
      time: form.time,
      reason: form.reason,
      status: "Pending",
    };

    setAppointments([newApt, ...appointments]);

    setSubmitted(true);

    setForm({
      name: "",
      phone: "",
      medicalRecord: "",
      reason: "",
      department: "",
      date: "",
      time: "",
    });

    setTimeout(() => setSubmitted(false), 3000);

  } catch (error) {

    console.log(error);
    alert("Error booking appointment");
  }
};

  const filteredApts = appointments.filter((a) => {
    const matchStatus = filterStatus === 'All' || a.status === filterStatus;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      a.patient.toLowerCase().includes(q) ||
      a.doctor.toLowerCase().includes(q) ||
      a.department.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const handleCancel = (id) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a)));
  };

  return (
    <div className="apt-page">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="apt-hero">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-content">
          <div className="hero-badge">647+ Doctors Online</div>
          <h1 className="hero-title">
            Don't Let Your Health<br />
            <span>Take a Backseat!</span>
          </h1>
          <p className="hero-sub">
            Fill out the appointment form below to schedule a consultation
            with one of our healthcare professionals.
          </p>
        </div>
        <div className="hero-card">
          <div className="hero-card-avatar">SB</div>
          <div>
            <div className="hero-card-name">Dr. Susan Bones, MD</div>
            <div className="hero-card-role">Physician</div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────── */}
      <section className="apt-main">

        {/* LEFT — Form */}
        <div className="apt-form-col">
          <div className="section-tag">Book a Visit</div>
          <h2 className="section-title">Appointment</h2>

          {submitted && (
            <div className="success-banner">
              ✓ &nbsp;Appointment booked successfully! You'll receive a confirmation shortly.
            </div>
          )}

          <form className="apt-form" onSubmit={handleSubmit}>

            <div className="form-row-2">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="David John"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="(123) 456 – 789"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Medical Record Number</label>
              <input
                name="medicalRecord"
                type="text"
                placeholder="123456–7890–0987"
                value={form.medicalRecord}
                onChange={handleChange}
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Reason for Visit</label>
                <div className="select-wrap">
                  <select name="reason" value={form.reason} onChange={handleChange} required>
                    <option value="">Select reason…</option>
                    {REASONS.map((r) => <option key={r}>{r}</option>)}
                  </select>
                  <span className="select-arrow">▾</span>
                </div>
              </div>
              <div className="form-group">
                <label>Department</label>
                <div className="select-wrap">
                  <select name="department" value={form.department} onChange={handleChange} required>
                    <option value="">Select dept…</option>
                    {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                  <span className="select-arrow">▾</span>
                </div>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Preferred Date</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">📅</span>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Preferred Time</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">🕐</span>
                  <input
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Book Appointment <span className="btn-arrow">→</span>
            </button>

          </form>
        </div>

        {/* RIGHT — Contact Info */}
        <div className="contact-col">
          <div className="section-tag">Get in Touch</div>
          <h2 className="section-title">Contact Info</h2>

          <div className="contact-img-wrapper">
            <div className="contact-img-placeholder">
              <div className="contact-img-icon">👩‍⚕️</div>
            </div>
          </div>

          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-item-icon">📞</div>
              <div>
                <div className="contact-item-label">Phone</div>
                <div className="contact-item-val">123-456-7890</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">✉️</div>
              <div>
                <div className="contact-item-label">Email Us</div>
                <div className="contact-item-val">hellocallcenter@caresync.com</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div>
                <div className="contact-item-label">Our Location</div>
                <div className="contact-item-val"> CareSync near NUST University , Islamabad, 4400</div>
              </div>
            </div>
          </div>

          <div className="hours-card">
            <div className="hours-title">Working Hours</div>
            <div className="hours-row"><span>Mon – Fri</span><span>8:00 AM – 8:00 PM</span></div>
            <div className="hours-row"><span>Saturday</span><span>9:00 AM – 5:00 PM</span></div>
            <div className="hours-row"><span>Sunday</span><span>Emergency Only</span></div>
          </div>
        </div>

      </section>

      {/* ── APPOINTMENTS TABLE ────────────────────── */}
      <section className="table-section">
        <div className="table-header">
          <div>
            <div className="section-tag">Records</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Booked Appointments</h2>
            <p className="table-subtitle">{filteredApts.length} appointment{filteredApts.length !== 1 ? 's' : ''} found</p>
          </div>
          <div className="table-controls">
            <input
              className="table-search"
              type="text"
              placeholder="Search patient, doctor, dept…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-tabs">
              {['All', 'Confirmed', 'Pending', 'Cancelled'].map((s) => (
                <button
                  key={s}
                  className={`filter-tab ${filterStatus === s ? 'active' : ''}`}
                  onClick={() => setFilterStatus(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="apt-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="table-empty">No appointments found.</td>
                </tr>
              ) : (
                filteredApts.map((apt) => (
                  <tr key={apt.id} className="apt-row">
                    <td><span className="apt-id">{apt.id}</span></td>
                    <td>
                      <div className="patient-cell">
                        <div className="patient-avatar">
                          {apt.patient.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </div>
                        <span>{apt.patient}</span>
                      </div>
                    </td>
                    <td>{apt.doctor}</td>
                    <td>
                      <span className="dept-chip">{apt.department}</span>
                    </td>
                    <td>{apt.date}</td>
                    <td>{apt.time}</td>
                    <td>{apt.reason}</td>
                    <td>
                      <span className={`status-chip ${STATUS_COLORS[apt.status]}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td>
                      {apt.status !== 'Cancelled' ? (
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancel(apt.id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="no-action">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary stats */}
        <div className="table-stats">
          {['Confirmed', 'Pending', 'Cancelled'].map((s) => (
            <div key={s} className={`stat-pill stat-pill-${s.toLowerCase()}`}>
              <span className="stat-num">{appointments.filter(a => a.status === s).length}</span>
              <span className="stat-label">{s}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
