import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer">

      <div className="footer-wave"></div>

      <div className="footer-container">

        {/* COLUMN 1 */}
        <div className="footer-col footer-about">

          <h2 className="footer-logo">
            CareSync
          </h2>

          <p>
            CareSync connects patients, doctors and hospitals
            in one intelligent healthcare platform. Manage
            appointments, reports, emergencies and healthcare
            services easily.
          </p>

          <button className="footer-btn">
            Get Started
          </button>
 <div className="footer-socials">
            <span>🌐</span>
            <span>📷</span>
            <span>💬</span>
          </div>
        </div>

        {/* COLUMN 2 (PAGES BACK - ONLY HEADING REMOVED FIXED) */}
        <div className="footer-col">

          <h3>Quick Links</h3>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/patients">Patients</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/lab-reports">Lab Reports</Link></li>
            <li><Link to="/emergency">Emergency</Link></li>
          </ul>

        </div>

        {/* COLUMN 3 */}
        <div className="footer-col">

          {/* SOCIAL ICONS FIRST ROW */}
         

          <p className="footer-connect-text">
            Connect with CareSync for support or feedback.
          </p>

          {/* CONTACT BUTTON */}
          <div className="footer-btn-row">
            <Link to="/contact" className="footer-connect-btn">
              Contact Us
            </Link>
          </div>

          {/* REVIEW BUTTON */}
          <div className="footer-btn-row">
            <Link to="/reviews" className="footer-connect-btn">
              Leave Your Review 
            </Link>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 CareSync. All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;