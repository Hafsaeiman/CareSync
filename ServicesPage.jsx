import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./ServicesPage.css";

/* ── SERVICE DATA ──────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 1,
    tag: "24 / 7",
    title: "Emergency Care",
    subtitle: "Immediate life-saving intervention",
    desc: "Round-the-clock emergency response with a dedicated trauma team, advanced resuscitation suites, and direct ICU escalation pathways. Average door-to-doctor time: 4 minutes.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    accent: "#ff2d4a",
    stats: [{ v: "4 min", l: "Response" }, { v: "98%", l: "Survival Rate" }, { v: "24/7", l: "Available" }],
    features: ["Trauma Bay", "Rapid Triage", "Code Blue Team", "Resuscitation Suite"],
  },
  {
    id: 2,
    tag: "Critical",
    title: "Intensive Care Unit",
    subtitle: "Advanced critical patient management",
    desc: "State-of-the-art ICU with continuous multi-parameter monitoring, ventilator support, and a dedicated intensivist team managing complex multi-organ cases.",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80",
    accent: "#4db8ff",
    stats: [{ v: "20", l: "ICU Beds" }, { v: "1:2", l: "Nurse Ratio" }, { v: "99%", l: "Uptime" }],
    features: ["Ventilator Support", "Continuous Monitoring", "Dialysis Unit", "Specialist On-call"],
  },
  {
    id: 3,
    tag: "Surgical",
    title: "Operating Theatres",
    subtitle: "Precision surgery, safer outcomes",
    desc: "Six fully equipped operating theatres including a dedicated robotic-assisted surgery suite. Our anaesthesiology team ensures optimal patient safety from induction to recovery.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
    accent: "#00d4a1",
    stats: [{ v: "6", l: "Theatres" }, { v: "50+", l: "Surgeries/Day" }, { v: "0.1%", l: "Complication Rate" }],
    features: ["Robotic Surgery", "Laparoscopic Suite", "Sterile Instrument Tracking", "Post-Op Recovery"],
  },
  {
    id: 4,
    tag: "Cardiology",
    title: "Heart & Vascular",
    subtitle: "Comprehensive cardiac diagnostics",
    desc: "Full-spectrum cardiac care from ECG and echocardiography to catheterisation lab procedures. Our interventional cardiology team handles AMI, arrhythmias, and heart failure.",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80",
    accent: "#ff2d4a",
    stats: [{ v: "2000+", l: "Procedures/Year" }, { v: "Cath Lab", l: "24/7 Active" }, { v: "15 min", l: "Door-to-Balloon" }],
    features: ["Cath Lab", "Echocardiography", "Holter Monitoring", "Cardiac Rehab"],
  },
  {
    id: 5,
    tag: "Diagnostics",
    title: "Laboratory & Imaging",
    subtitle: "Fast, accurate diagnostic results",
    desc: "Fully automated laboratory with 1-hour STAT turnaround. Advanced imaging including 3T MRI, 128-slice CT, and digital fluoroscopy — all under one roof.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
    accent: "#f5a623",
    stats: [{ v: "1 hr", l: "STAT Results" }, { v: "3T MRI", l: "Available" }, { v: "200+", l: "Tests Offered" }],
    features: ["3T MRI", "128-Slice CT", "STAT Lab", "Digital X-Ray"],
  },
  {
    id: 6,
    tag: "Ambulance",
    title: "Emergency Transport",
    subtitle: "Rapid pre-hospital response",
    desc: "Fleet of Advanced Life Support ambulances with paramedic crews, real-time GPS dispatch, and direct communication with the ER team before patient arrival.",
    image: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&q=80",
    accent: "#00d4a1",
    stats: [{ v: "12", l: "ALS Units" }, { v: "6 min", l: "Avg Dispatch" }, { v: "GPS", l: "Live Tracking" }],
    features: ["ALS Paramedics", "Live GPS Dispatch", "Neonatal Transport", "Air Ambulance Link"],
  },
  {
    id: 7,
    tag: "Paediatrics",
    title: "Child & Neonatal Care",
    subtitle: "Specialist care for our smallest patients",
    desc: "Dedicated paediatric ward and NICU with child-friendly environments, neonatal intensive care for premature infants, and a multidisciplinary developmental team.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
    accent: "#4db8ff",
    stats: [{ v: "30", l: "Paed Beds" }, { v: "NICU", l: "Level III" }, { v: "48 hr", l: "NICU Ready" }],
    features: ["NICU Level III", "Paediatric Surgery", "Child Psychology", "Family Rooms"],
  },
  {
    id: 8,
    tag: "Rehabilitation",
    title: "Physio & Recovery",
    subtitle: "Restoring strength, restoring life",
    desc: "Comprehensive inpatient and outpatient rehabilitation covering physiotherapy, occupational therapy, speech therapy, and neuro-rehabilitation following stroke or injury.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    accent: "#f5a623",
    stats: [{ v: "95%", l: "Patient Satisfaction" }, { v: "3 Gyms", l: "On-Site" }, { v: "Daily", l: "PT Sessions" }],
    features: ["Physiotherapy", "Occupational Therapy", "Speech Therapy", "Neuro-Rehab"],
  },
];

const PROCESS = [
  { step: "01", title: "Arrival & Triage", desc: "Patient is received and severity assessed within 2 minutes by our triage nurse.", icon: "🚪" },
  { step: "02", title: "Rapid Assessment", desc: "Senior physician evaluates and orders diagnostics. STAT results in under 60 minutes.", icon: "🩺" },
  { step: "03", title: "Treatment Plan", desc: "Specialist team activated. Treatment begins immediately — no waiting queues.", icon: "📋" },
  { step: "04", title: "Care & Monitoring", desc: "Continuous monitoring with family updates every hour throughout admission.", icon: "💊" },
];

/* ── COMPONENT ─────────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeService, setActiveService] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  const filters = ["All", "24/7 Critical", "Surgical", "Diagnostics", "Support"];
  const filterMap = {
    "All": () => true,
    "24/7 Critical": s => ["Emergency Care", "Intensive Care Unit", "Heart & Vascular"].includes(s.title),
    "Surgical": s => ["Operating Theatres", "Heart & Vascular"].includes(s.title),
    "Diagnostics": s => ["Laboratory & Imaging"].includes(s.title),
    "Support": s => ["Emergency Transport", "Child & Neonatal Care", "Physio & Recovery"].includes(s.title),
  };
  const filtered = SERVICES.filter(filterMap[activeFilter]);

  /* Intersection observer for card reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = parseInt(e.target.dataset.id);
            setVisibleCards(prev => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.12 }
    );
    cardRefs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <div className="sp-root">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="sp-hero">
        <div className="sp-hero__noise" />
        <div className="sp-hero__lines" />
        <div className="sp-hero__content">
          <div className="sp-hero__pill">✚ CareSynce Hospital Network</div>
          <h1 className="sp-hero__title">
            <span className="sp-hero__title-line1">World-Class</span>
            <span className="sp-hero__title-line2">Medical <em>Services</em></span>
          </h1>
          <p className="sp-hero__desc">
            Comprehensive care across every specialty — from first response to full rehabilitation.
            Powered by technology. Driven by compassion.
          </p>
          {/* <div className="sp-hero__cta-row">
            <button className="sp-btn sp-btn--primary">Book Appointment</button>
            <button className="sp-btn sp-btn--outline">Emergency Line: +92-11-22</button>
          </div> */}
          <div className="sp-hero__cta-row">
  <Link
    to="/appointments"
    className="sp-btn sp-btn--primary"
  >
    Book Appointment
  </Link>
            <button className="sp-btn sp-btn--outline">Emergency Line: +92-11-22</button>
</div>
        </div>
        <div className="sp-hero__numbers">
          {[["98%","Patient Satisfaction"],["500+","Specialists"],["24/7","Emergency Care"],["15+","Departments"]].map(([v,l],i) => (
            <div key={i} className="sp-hero__num">
              <span className="sp-hero__num-val">{v}</span>
              <span className="sp-hero__num-label">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FILTER BAR ───────────────────────────────────────── */}
      <div className="sp-filterbar">
        <div className="sp-filterbar__inner">
          {filters.map(f => (
            <button
              key={f}
              className={`sp-filter-btn ${activeFilter === f ? "sp-filter-btn--active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section className="sp-services">
        <div className="sp-services__grid">
          {filtered.map((svc, i) => (
            <article
              key={svc.id}
              ref={el => cardRefs.current[i] = el}
              data-id={svc.id}
              className={`sp-card ${visibleCards.has(svc.id) ? "sp-card--visible" : ""}`}
              style={{ "--accent": svc.accent, "--delay": `${i * 80}ms` }}
              onClick={() => setActiveService(svc)}
            >
              {/* Image */}
              <div className="sp-card__img-wrap">
                <img src={svc.image} alt={svc.title} className="sp-card__img" loading="lazy" />
                <div className="sp-card__img-overlay" />
                <span className="sp-card__tag">{svc.tag}</span>
              </div>

              {/* Body */}
              <div className="sp-card__body">
                <h3 className="sp-card__title">{svc.title}</h3>
                <p className="sp-card__subtitle">{svc.subtitle}</p>
                <p className="sp-card__desc">{svc.desc}</p>

                {/* Stats row */}
                <div className="sp-card__stats">
                  {svc.stats.map((st, j) => (
                    <div key={j} className="sp-card__stat">
                      <span className="sp-card__stat-val">{st.v}</span>
                      <span className="sp-card__stat-label">{st.l}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="sp-card__features">
                  {svc.features.map((f, j) => (
                    <span key={j} className="sp-card__feat">✦ {f}</span>
                  ))}
                </div>

                <button className="sp-card__cta">Learn More →</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROCESS SECTION ──────────────────────────────────── */}
      <section className="sp-process">
        <div className="sp-process__header">
          <span className="sp-section-pill">Our Process</span>
          <h2 className="sp-section-title">From Arrival to <em>Recovery</em></h2>
          <p className="sp-section-sub">Every patient journey is guided by our streamlined clinical protocol, ensuring zero delays and maximum care.</p>
        </div>
        <div className="sp-process__steps">
          {PROCESS.map((p, i) => (
            <div key={i} className="sp-step">
              <div className="sp-step__num">{p.step}</div>
              <div className="sp-step__icon">{p.icon}</div>
              <h4 className="sp-step__title">{p.title}</h4>
              <p className="sp-step__desc">{p.desc}</p>
              {i < PROCESS.length - 1 && <div className="sp-step__arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── BANNER CTA ───────────────────────────────────────── */}
      <section className="sp-banner">
        <div className="sp-banner__bg" />
        <div className="sp-banner__content">
          <span className="sp-section-pill">Always Ready</span>
          <h2 className="sp-banner__title">Medical Emergency?<br /><span>We're Here Right Now.</span></h2>
          <p className="sp-banner__sub">Our emergency team is standing by 24 hours a day, 365 days a year. Don't wait — every second counts.</p>
          {/* <div className="sp-hero__cta-row">
            <button className="sp-btn sp-btn--primary">🚨 Call Emergency</button>
            <button className="sp-btn sp-btn--outline">Book Appointment</button>
          </div> */}
          <div className="sp-hero__cta-row">
  <Link
    to="/emergency"
    className="sp-btn sp-btn--primary"
  >
    🚨 Call Emergency
  </Link>
  <Link to="/appointments" className="sp-btn sp-btn--outline"
  >Book Appointment</Link>

</div>
        </div>
      </section>

      {/* ── MODAL ────────────────────────────────────────────── */}
      {activeService && (
        <div className="sp-modal-overlay" onClick={() => setActiveService(null)}>
          <div className="sp-modal" onClick={e => e.stopPropagation()} style={{ "--accent": activeService.accent }}>
            <button className="sp-modal__close" onClick={() => setActiveService(null)}>✕</button>
            <div className="sp-modal__img-wrap">
              <img src={activeService.image} alt={activeService.title} />
              <div className="sp-modal__img-overlay" />
              <span className="sp-card__tag">{activeService.tag}</span>
            </div>
            <div className="sp-modal__body">
              <h2 className="sp-modal__title">{activeService.title}</h2>
              <p className="sp-modal__sub">{activeService.subtitle}</p>
              <p className="sp-modal__desc">{activeService.desc}</p>
              <div className="sp-card__stats sp-modal__stats">
                {activeService.stats.map((st, i) => (
                  <div key={i} className="sp-card__stat">
                    <span className="sp-card__stat-val">{st.v}</span>
                    <span className="sp-card__stat-label">{st.l}</span>
                  </div>
                ))}
              </div>
              <div className="sp-modal__features">
                {activeService.features.map((f, i) => (
                  <div key={i} className="sp-modal__feat-item">
                    <span className="sp-modal__feat-dot" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="sp-modal__actions">
                <button className="sp-btn sp-btn--primary" onClick={() => setActiveService(null)}>Book This Service</button>
                <button className="sp-btn sp-btn--outline" onClick={() => setActiveService(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}