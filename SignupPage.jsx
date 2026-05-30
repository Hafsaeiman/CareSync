import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {

  /* =========================
     STATES
  ========================= */

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  /* =========================
     SIGNUP SUBMIT
  ========================= */

  const signupSubmit = async (e) => {

    e.preventDefault();

    setError("");

    /* PASSWORD MATCH CHECK */

    if (formData.password !== formData.confirmPassword) {

      setError(
        "Passwords do not match. Please try again."
      );

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Signup failed"
        );

      }

      alert(
        data.message || "Account created successfully"
      );

      /* CLEAR FORM */

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        confirmPassword: ""
      });

      navigate("/login");

    } catch (error) {

      console.log("Signup Error:", error);

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-card signup-card">

        {/* ================= LEFT ================= */}

        <div className="auth-left">

          <div className="auth-left-top">

            <div className="brand">
              CareSync
            </div>

            <h2>
              Join the
              <br />
              <em>future of</em>
              <br />
              healthcare.
            </h2>

            <p>
              Create your account and manage
              appointments, records, and teams
              from one intelligent platform.
            </p>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="auth-right">

          <div className="auth-right-header">

            <h1>
              Create account
            </h1>

            <p>
              Fill in your details to get
              started with CareSync
            </p>

          </div>

          {/* ================= FORM ================= */}

          <form
            id="signup-form"
            onSubmit={signupSubmit}
          >

            {error && (

              <div
                id="signup-error"
                className="error-msg show"
              >
                {error}
              </div>

            )}

            {/* FIRST + LAST NAME */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="Jane"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Smith"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@hospital.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* PHONE + ROLE */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="0300-0000000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Select Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Choose role…
                  </option>

                  <option>
                    Doctor
                  </option>

                  <option>
                    Patient
                  </option>

                  <option>
                    Admin
                  </option>

                  <option>
                    Nurse
                  </option>

                </select>

              </div>

            </div>

            {/* PASSWORDS */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Min 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="auth-btn"
              id="signup-btn"
              disabled={loading}
            >

              <span>

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

              </span>

            </button>

          </form>

          {/* FOOTER */}

          <div className="auth-foot">

            Already have an account?{" "}

            <Link to="/login">
              Sign In
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}

export default SignupPage;