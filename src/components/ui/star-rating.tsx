import React, { useState } from 'react';

const StarRating = ({ initialRating = 0, onChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onChange(selectedRating); // Call the onChange callback with the selected rating
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          className={`text-3xl cursor-pointer ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
        >
          &#9733; {/* Unicode character for a star */}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
