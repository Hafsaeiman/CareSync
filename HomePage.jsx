import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img from "../assets/2.png";
import "./HomePage.css";

const HomePage = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Assistant",
      text: "Hello! How can we help you today?"
    }
  ]);

  // 👇 ADD IT HERE
  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { sender: "You", text: userMessage }
    ]);

    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "Assistant", text: data.reply }
      ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "Assistant", text: "Server not responding." }
      ]);
    }
  };
  const doctors = [
    {
      id: 1,
      name: "Dr. Ahmed Raza",
      specialty: "Cardiologist",
      patients: "4,500+",
      reviews: "4.9 (2,100)",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Dr. Ayesha Khan",
      specialty: "Neurologist",
      patients: "3,200+",
      reviews: "4.8 (1,400)",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Dr. Hassan Ali",
      specialty: "Pediatrician",
      patients: "5,100+",
      reviews: "5.0 (2,900)",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const testimonials = [
    {
      id: 1,
      text: "The doctors at CareSync were incredibly attentive. My treatment plan was explained thoroughly and the care I received was second to none.",
      name: "Sana Mirza",
      role: "Cardiology Patient",
      initials: "SM",
    },
    {
      id: 2,
      text: "From booking my appointment to my discharge, every step was seamless. I felt genuinely cared for the entire time.",
      name: "Tariq Mahmood",
      role: "Orthopedics Patient",
      initials: "TM",
    },
    {
      id: 3,
      text: "Exceptional pediatric team. My daughter was nervous but the staff made her feel completely at ease. Highly recommended.",
      name: "Nadia Hassan",
      role: "Pediatrics Parent",
      initials: "NH",
    },
  ];

  const services = [
    { icon: "🩺", title: "General Medicine", desc: "Comprehensive diagnosis and primary care for all ages." },
    { icon: "❤️", title: "Cardiac Care", desc: "Advanced heart monitoring and intervention services." },
    { icon: "🧠", title: "Neurosciences", desc: "Cutting-edge treatment for neurological conditions." },
    { icon: "🦴", title: "Orthopedics", desc: "Bone, joint and rehabilitation excellence." },
    { icon: "👶", title: "Pediatrics", desc: "Gentle, specialized care for infants and children." },
    { icon: "🚑", title: "Emergency", desc: "Round-the-clock rapid response trauma care." },
    { icon: "🔬", title: "Diagnostics", desc: "Full-spectrum lab, imaging and pathology." },
    { icon: "💊", title: "Pharmacy", desc: "On-site pharmacy with expert consultation." },
  ];

  return (
    <div className="homepage">
      <Navbar />

      {/* ── HERO ── */}
      <header className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Your Health,<br />Our Priority</h1>
            <p>
              Experience world-class healthcare with our expert team of doctors
              and state-of-the-art facilities. Available 24/7 for your care.
            </p>
    
            <div className="hero-actions">
              <button className="cta-button" onClick={() => (window.location.href = "/appointments")}>
                Book an Appointment
              </button>
              {/* <button className="cta-secondary" onClick={() => (window.location.href = "/services")}>
                View Our Services →
              </button> */}
            </div>
          </div>

          {/* <div className="hero-image">
            <img src={img} alt="Modern Hospital" />
          </div> */}
        </div>
      </header>
      {/* ── SHOWCASE (Advanced Care) ── */}
      <section className="hospital-showcase">
        <div className="container">
          <div className="showcase-hero">
            <div className="showcase-overlay" />
            <div className="showcase-content">
              <div className="showcase-left">
                <h1>Advanced Care<br />For Every Patient</h1>
                <p>
                  Providing world-class healthcare services with experienced
                  specialists, modern facilities, and compassionate treatment.
                </p>
                <Link to="/services" className="hero-btn">Explore Services</Link>
              </div>
              <div className="showcase-right">
                <div className="floating-card">
                  <h3>24/7 Emergency</h3>
                  <p>Fast emergency response with expert medical staff available around the clock.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ABOUT GRID */}
          <div className="about-grid">
            <div className="about-card stats-card">
              <h1>150+</h1>
              <p>Specialist Doctors</p>
              <div className="mini-stats">
                <div>
                  <h2>25+</h2>
                  <span>Departments</span>
                </div>
                <div>
                  <h2>50K+</h2>
                  <span>Patients</span>
                </div>
              </div>
            </div>

            <div className="about-card">
              <h3>Who We Are</h3>
              <p>
                CareSync Hospital is dedicated to providing trusted healthcare
                services with modern medical technology and experienced professionals.
              </p>
              <p>
                Our mission is to ensure every patient receives compassionate,
                personalized, and high-quality treatment at every step.
              </p>
            </div>

            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=800&auto=format&fit=crop"
                alt="Doctor"
              />
            </div>
          </div>

          {/* DEPARTMENTS */}
          <section className="departments-section">
            <div className="section-heading">
              <div className="section-tag">Departments</div>
              <h2>Our Medical Departments</h2>
              <p>Specialized departments designed to provide complete healthcare solutions.</p>
            </div>

            <div className="departments-grid">
              <div className="department-card large-card">
                <div className="department-content">
                  <span>01</span>
                  <h3>Cardiology</h3>
                  <p>Advanced heart care with modern diagnostic and treatment facilities.</p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop"
                  alt="Cardiology"
                />
              </div>

              <div className="department-card">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1000&auto=format&fit=crop"
                  alt="Neurology"
                />
                <div className="small-department-content">
                  <h3>Neurology</h3>
                  <p>Advanced diagnosis and treatment for brain and nervous system disorders.</p>
                </div>
              </div>

              <div className="department-card">
                <img
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop"
                  alt="Pediatrics"
                />
                <div className="small-department-content">
                  <h3>Pediatrics</h3>
                  <p>Compassionate healthcare services for infants and children.</p>
                </div>
              </div>

              <div className="department-card">
                <img
                  src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop"
                  alt="Orthopedics"
                />
                <div className="small-department-content">
                  <h3>Orthopedics</h3>
                  <p>Modern bone and joint treatment with rehabilitation support.</p>
                </div>
              </div>

              <div className="department-card">
                <img
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1000&auto=format&fit=crop"
                  alt="Emergency Care"
                />
                <div className="small-department-content">
                  <h3>Emergency Care</h3>
                  <p>24/7 emergency services with rapid response teams.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* ── SERVICES STRIP ── */}
      <section className="services-strip">
        <div className="services-strip-inner">
          <h2>Everything You Need Under One Roof</h2>
          <div className="services-list">
            {services.map((s, i) => (
              <div className="service-item" key={i}>
                <div className="service-icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="doctors-section">
        <div className="container">
          <div className="section-heading">
            <div className="section-tag">Medical Team</div>
            <h2>Our Best Doctors</h2>
            <p>Meet our expert team of healthcare professionals</p>
          </div>

          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-image-wrap">
                  <img src={doctor.image} alt={doctor.name} />
                  <div className="verified-badge">✓ Verified</div>
                </div>
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialty">{doctor.specialty}</p>
                  <div className="doctor-stats">
                    <span>👤 {doctor.patients} Patients</span>
                    <span>⭐ {doctor.reviews}</span>
                  </div>
                  <div className="book-btn"><Link to="/appointments"className="sp-btn sp-btn--primary">Book 
                  Appointment</Link>
  </div>                
  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="why-choose">
        <div className="container">
          <div className="section-heading">
            <div className="section-tag">Why CareSync</div>
            <h2>Why Choose CareSync</h2>
            <p>We put patients at the centre of everything we do</p>
          </div>

          <div className="choose-grid">
            <div className="choose-card light">
              <h3>Expert Doctors</h3>
              <p>Highly experienced specialists delivering trusted, evidence-based treatment.</p>
              <div className="choose-feature">
                <span className="icon">🎓</span> Board-certified specialists
              </div>
              <div className="choose-feature">
                <span className="icon">🔬</span> Research-backed protocols
              </div>
              <div className="choose-feature">
                <span className="icon">🤝</span> Multidisciplinary teams
              </div>
            </div>

            <div className="choose-card image-card">
              <img
                src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=1200&auto=format&fit=crop"
                alt="Hospital"
              />
              <div className="image-overlay">
                <h3>Modern Facilities</h3>
              </div>
            </div>

            <div className="choose-card dark">
              <h3>Patient-Centered Care</h3>
              <p>Personalized healthcare services focused on your comfort and complete recovery.</p>
              <div className="choose-feature">
                <span className="icon">🕐</span> 24/7 availability
              </div>
              <div className="choose-feature">
                <span className="icon">📋</span> Personalized care plans
              </div>
              <div className="choose-feature">
                <span className="icon">💬</span> Ongoing follow-up support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials">
        <div className="container">
          <div className="section-heading">
            <div className="section-tag">Patient Stories</div>
            <h2>What Our Patients Say</h2>
            <p>Real stories from people who trusted us with their health</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div className="author-info">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-banner-inner">
          <div className="cta-banner-box">
            <div className="cta-banner-text">
              <h2>Ready to Take Charge<br />of Your Health?</h2>
              <p>
                Book an appointment with one of our specialists today.
                Your journey to better health starts with a single step.
              </p>
            </div>
            <div className="cta-banner-actions">
              <button className="cta-btn-primary" onClick={() => (window.location.href = "/appointments")}>
                Book Appointment
              </button>
              <button className="cta-btn-outline" onClick={() => (window.location.href = "/contact")}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}

      {/* ── CHAT ICON ── */}
      <div className="chat-icon" onClick={() => setShowChat(!showChat)}>
        {showChat ? "×" : "💬"}
      </div>

      {/* ── CHAT WIDGET ── */}
      {/* ── CHAT WIDGET ── */}
{showChat && (
  <div className="chat-widget">

    <div className="chat-header">
      <span>🩺 Online Medical Help</span>
      <button
        className="chat-close"
        onClick={() => setShowChat(false)}
      >
        ×
      </button>
    </div>

    <div className="chat-body">
      {messages.map((msg, index) => (
        <div key={index} className="chat-message">
          <strong>{msg.sender}:</strong> {msg.text}
        </div>
      ))}
    </div>

    <div className="chat-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <button onClick={handleSend}>
        Send
      </button>
    </div>

  </div>
)}
</div>
  );
};
export default HomePage;