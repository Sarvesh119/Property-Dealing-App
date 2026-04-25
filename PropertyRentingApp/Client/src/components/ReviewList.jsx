import React, { useState } from 'react';
import { CiStar } from "react-icons/ci";
import api from '../services/api';

const ReviewList = () => {
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/reviews/', { rating });
    console.log("Submitted rating:", rating);
  };

  return (
    <div className="reviews" style={{ padding: '10px' }}>
      <h4>Reviews</h4>
      <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }}>
        {Array(5).fill().map((_, i) => (
          <CiStar
            key={i}
            size={25}
            color={i < rating ? "gold" : "gray"}
            onClick={() => setRating(i + 1)}
          />
        ))}
      </div>
      <p style={{ marginTop: '10px' }}>You rated: {rating} / 5</p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ReviewList;
