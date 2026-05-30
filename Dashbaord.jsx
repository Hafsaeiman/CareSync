import React from 'react';
import './Dashboard.css';

const Dashboard = () => {

  return (
    <div className="dashboard-page">

      <div className="dashboard-sidebar">

        <div className="dashboard-profile">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <h3>Dr. Ahmed</h3>

          <p>Senior Cardiologist</p>

        </div>

        <ul className="dashboard-menu">
          <li>Overview</li>
          <li>Appointments</li>
          <li>Patients</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>

      </div>

      <div className="dashboard-content">

        <h1>Doctor Dashboard</h1>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h2>120+</h2>
            <p>Total Patients</p>
          </div>

          <div className="dashboard-card">
            <h2>35</h2>
            <p>Appointments Today</p>
          </div>

          <div className="dashboard-card">
            <h2>15</h2>
            <p>Pending Reports</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;