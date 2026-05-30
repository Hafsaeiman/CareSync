import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {

  /* =========================
     STATES
  ========================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    /* VALIDATION */

    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.message.trim() === ""
    ) {

      alert("Please fill all fields");

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      /* HANDLE BACKEND ERRORS */

      if (!response.ok) {

        throw new Error(
          data.message || "Something went wrong"
        );

      }

      /* SUCCESS */

      alert(data.message || "Message sent successfully");

      /* CLEAR FORM */

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {

      console.log("Contact Error:", error);

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     UI
  ========================= */

  return (

    <div className="contact-page">

      <div className="contact-card">

        <h1>Contact CareSync</h1>

        <p>
          Have questions or need assistance?
          Send us a message.
        </p>

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* MESSAGE */}

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Sending..."
              : "Send Message"}

          </button>

        </form>

      </div>

    </div>

  );

};

export default ContactForm;