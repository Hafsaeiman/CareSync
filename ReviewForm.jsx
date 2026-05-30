import React, { useState, useEffect } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {

  /* =========================
     STATES
  ========================= */

  const [reviewData, setReviewData] = useState({
    name: "",
    review: ""
  });

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH REVIEWS
  ========================= */

  useEffect(() => {

    fetchReviews();

  }, []);

  const fetchReviews = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/reviews"
      );

      const data = await response.json();

      setReviews(data);

    } catch (error) {

      console.log("Fetch Error:", error);

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (e) => {

    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value
    });

  };

  /* =========================
     SUBMIT REVIEW
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    /* VALIDATION */

    if (
      reviewData.name.trim() === "" ||
      reviewData.review.trim() === ""
    ) {

      alert("Please fill all fields");

      return;

    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/reviews",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(reviewData)
        }
      );

      const data = await response.json();

      alert(data.message);

      /* ADD REVIEW INSTANTLY */

      setReviews([
        reviewData,
        ...reviews
      ]);

      /* CLEAR FORM */

      setReviewData({
        name: "",
        review: ""
      });

    } catch (error) {

      console.log("Submit Error:", error);

      alert("Error submitting review");

    }

  };

  /* =========================
     UI
  ========================= */

  return (

    <div className="review-page">

      <div className="review-card">

        <h1>Patient Reviews</h1>

        <p>
          Share your experience with CareSync.
        </p>

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={reviewData.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="review"
            placeholder="Write your review..."
            rows="5"
            value={reviewData.review}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">
            Submit Review
          </button>

        </form>

        {/* ================= REVIEWS ================= */}

        <div className="reviews-container">

          {loading ? (

            <p>Loading reviews...</p>

          ) : reviews.length === 0 ? (

            <p>No reviews yet.</p>

          ) : (

            reviews.map((item, index) => (

              <div className="review-box" key={index}>

                <h3>
                  {item.name}
                </h3>

                <p>
                  {item.review}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

};

export default ReviewForm;