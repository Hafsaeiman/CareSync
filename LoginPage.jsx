import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import "./LoginPage.css";

function LoginPage() {

  /* =========================
     STATES
  ========================= */

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showForgot, setShowForgot] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");

  const [msg, setMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* =========================
     LOGIN SUBMIT
  ========================= */

  const loginSubmit = async (e) => {

    e.preventDefault();

    if (!email || !password) {

      alert("Please fill all fields");

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Login failed"
        );

      }

      /* SAVE USER */

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      console.log("Login Error:", error);

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     FORGOT PASSWORD
  ========================= */

  const forgotSubmit = async (e) => {

    e.preventDefault();

    if (!forgotEmail) {

      setMsg("Please enter your email");

      return;

    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: forgotEmail
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Failed"
        );

      }

      setMsg(
        data.message ||
        `Password reset link sent to ${forgotEmail}`
      );

      setForgotEmail("");

    } catch (error) {

      console.log(error);

      setMsg(error.message);

    }

  };

  /* =========================
     UI
  ========================= */

  return (

    <div className="auth-page">

      <div className="auth-card">

        {/* ================= LEFT ================= */}

        <div className="auth-left">

          <div>

            <div className="brand">
              CareSync
            </div>

            <h2>
              Your health,
              <br />
              <em>connected.</em>
            </h2>

            <p>
              Secure access to your hospital
              management dashboard.
              Streamlined care for patients,
              doctors & admins.
            </p>

            <div className="art-container">

              <div className="art-ring art-ring-1"></div>

              <div className="art-ring art-ring-2"></div>

              <div className="art-dot art-dot-1"></div>

              <div className="art-dot art-dot-2"></div>

              <div className="art-pill art-pill-1"></div>

              <div className="art-pill art-pill-2"></div>

            </div>

          </div>

          <div className="trust-badges">

            <span className="trust-badge">
              HIPAA Compliant
            </span>

            <span className="trust-badge">
              256-bit SSL
            </span>

            <span className="trust-badge">
              ISO 27001
            </span>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="auth-right">

          {!showForgot ? (

            <>

              <div className="auth-right-header">

                <h1>
                  Welcome back
                </h1>

                <p>
                  Sign in to access your
                  CareSync account
                </p>

              </div>

              {/* LOGIN FORM */}

              <form onSubmit={loginSubmit}>

                <div className="form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@hospital.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-options">

                  <label className="remember">

                    <input type="checkbox" />

                    Remember me

                  </label>

                  <button
                    type="button"
                    className="forgot-btn"
                    onClick={() =>
                      setShowForgot(true)
                    }
                  >
                    Forgot Password?
                  </button>

                </div>

                <button
                  type="submit"
                  className="auth-btn"
                  disabled={loading}
                >

                  <span>

                    {loading
                      ? "Signing In..."
                      : "Sign In"}

                  </span>

                </button>

              </form>

              <div className="auth-foot">

                Don't have an account?{" "}

                <Link to="/signup">
                  Create one
                </Link>

              </div>

            </>

          ) : (

            <>

              {/* FORGOT PASSWORD */}

              <div className="auth-right-header">

                <h1>
                  Forgot Password
                </h1>

                <p>
                  Enter your email to
                  receive reset link
                </p>

              </div>

              <form onSubmit={forgotSubmit}>

                <div className="form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@hospital.com"
                    value={forgotEmail}
                    onChange={(e) =>
                      setForgotEmail(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                {msg && (

                  <div className="success-msg">
                    {msg}
                  </div>

                )}

                <button
                  type="submit"
                  className="auth-btn"
                >

                  <span>
                    Send Reset Link
                  </span>

                </button>

              </form>

              <div className="auth-foot">

                <button
                  className="back-btn"
                  onClick={() => {

                    setShowForgot(false);

                    setMsg("");

                  }}
                >
                  Back to Login
                </button>

              </div>

            </>

          )}

        </div>

      </div>

    </div>

  );

}

export default LoginPage;