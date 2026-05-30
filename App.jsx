import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import PatientsPage from './pages/PatientsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import LabReportsPage from './pages/LabReportsPage';
import EmergencyPage from './pages/EmergencyPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ContactForm from './components/ContactForm';
import ReviewForm from './components/ReviewForm';
import ServicesPage from './pages/ServicesPage';


import './App.css';

function App() {

  return (

    <Router>

      <div className="App">

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="main-content">

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            {/* MAIN PAGES */}
            <Route
              path="/doctors"
              element={<DoctorsPage />}
            />

            <Route
              path="/patients"
              element={<PatientsPage />}
            />

            <Route
              path="/appointments"
              element={<AppointmentsPage />}
            />

            <Route
              path="/lab-reports"
              element={<LabReportsPage />}
            />

            <Route
              path="/emergency"
              element={<EmergencyPage />}
            />

            {/* CONTACT + REVIEW FORMS */}
            <Route
              path="/contact"
              element={<ContactForm />}
            />

            <Route
              path="/reviews"
              element={<ReviewForm />}
            />

            {/* SERVICES PAGE */}
            
            <Route
              path="/services"
              element={<ServicesPage />}
            />
           

            {/* AUTH PAGES */}
            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/signup"
              element={<SignupPage />}
            />

            <Route
              path="/profile"
              element={<ProfilePage />}
            />

            {/* 404 PAGE */}
            <Route
              path="*"
              element={
                <div className="not-found">

                  <h1>
                    404 - Page Not Found
                  </h1>

                  <p>
                    Page exist nahi karti
                  </p>

                </div>
              }
            />

          </Routes>

        </main>

        {/* FOOTER */}
        <Footer />

      </div>

    </Router>

  );
}

export default App;