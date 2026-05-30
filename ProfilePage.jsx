import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    specialization: "",
    experience: "",
    address: ""
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      alert(data.message);

    } catch (error) {
      console.log(error);
      alert("Error saving profile");
    }
  };

  return (
    <div className="profile-page">

      <div className="profile-container">

        <h1>Doctor Profile</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* FIRST NAME */}
            <div className="input-group">
              <label>First Name</label>

              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* LAST NAME */}
            <div className="input-group">
              <label>Last Name</label>

              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PHONE */}
            <div className="input-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                placeholder="03XX-XXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* GENDER */}
            <div className="input-group">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            {/* DATE OF BIRTH */}
            <div className="input-group">
              <label>Date of Birth</label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            {/* SPECIALIZATION */}
            <div className="input-group">
              <label>Specialization</label>

              <input
                type="text"
                name="specialization"
                placeholder="Cardiologist"
                value={formData.specialization}
                onChange={handleChange}
              />
            </div>

            {/* EXPERIENCE */}
            <div className="input-group">
              <label>Experience</label>

              <input
                type="number"
                name="experience"
                placeholder="Years"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* ADDRESS */}
          <div className="input-group full-width">
            <label>Address</label>

            <textarea
              name="address"
              rows="4"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="save-btn"
          >
            Save Profile
          </button>

        </form>

      </div>

    </div>
  );
};

export default ProfilePage;