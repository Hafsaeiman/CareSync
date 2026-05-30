import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // USER DATA FROM LOCAL STORAGE
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const user = {
    isLoggedIn: storedUser ? true : false,
    name: storedUser?.name || "Guest"
  };

  return (

    <nav className="navbar">

      <div className="nav-container">

        {/* LOGO */}
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <h2 className="nav-logo">CareSync</h2>
          </Link>
        </div>

        {/* MENU */}
        <ul className="nav-menu">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/doctors">Doctors</Link>
          </li>

          <li>
            <Link to="/patients">Patients</Link>
          </li>

          <li>
            <Link to="/appointments">Appointments</Link>
          </li>

          <li>
            <Link to="/lab-reports">Lab Reports</Link>
          </li>

          <li>
            <Link to="/emergency">Emergency</Link>
          </li>

        </ul>

        {/* RIGHT PROFILE */}
        <div className="nav-right">

          {/* PROFILE BUTTON */}
          <div
            className="profile-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >

            <img
              src="./src/assets/images.png"
              alt="profile"
            />

            <span>{user.name}</span>

          </div>

          {/* DROPDOWN */}
          {isMenuOpen && (

            <div className="profile-dropdown">

              {/* TOP PROFILE SECTION */}
              <div className="profile-top">

                <img
                  src="./src/assets/images.png"
                  alt="profile"
                />

                <h3>{user.name}</h3>

              </div>

              {/* PROFILE + DASHBOARD */}
<div className="profile-actions">

  <Link
    to="/profile"
    className="profile-action-btn"
    onClick={() => setIsMenuOpen(false)}
  >
    My Profile
  </Link>

</div>

{/* LOGIN / LOGOUT */}
<div className="auth-buttons">

  {user.isLoggedIn ? (
    <>
      <Link
        to="/logout"
        className="login-btn"
        onClick={() => {
          localStorage.removeItem("user");
          setIsMenuOpen(false);
        }}
      >
        Logout
      </Link>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="login-btn"
        onClick={() => setIsMenuOpen(false)}
      >
        Login
      </Link>
    </>
  )}

</div>

            </div>

          )}

        </div>

      </div>

    </nav>

  );
};

export default Navbar;