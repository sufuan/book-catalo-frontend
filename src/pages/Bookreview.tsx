// import React, { useState } from 'react';
// import StarRating from '../components/ui/star-rating';
// import { useCreateReviewMutation } from '@/redux/api/apiSlice';

// const Bookreview = ({ bookId }) => {
//   const [review, setReview] = useState('');
//   const [rating, setRating] = useState(0);

//   const handleRatingChange = (selectedRating) => {
//     setRating(selectedRating);
//   };

//   const [createReview, { data, isLoading, error, isError, isSuccess }] =
//     useCreateReviewMutation();

//   const handleSubmit = () => {
//     // Perform submission logic with review text and rating
//     const formData = {
//       bookId: bookId,
//       rating: review,
//       reviewText: rating,
//     };
//     createReview(formData);

//     if (isLoading) {
//       return <div>Loading...</div>;
//     }

//     console.log('Submitted Review:', formData);
//     console.log(data, isSuccess);

//     // Reset the form after submission
//     setReview('');
//     setRating(0);
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>

//       <label className="block mb-4">
//         <span className="text-gray-700">Rating:</span>
//         <StarRating initialRating={rating} onChange={handleRatingChange} />
//       </label>

//       <label className="block mb-4">
//         <span className="text-gray-700">Your Review:</span>
//         <textarea
//           name="review"
//           value={review}
//           onChange={(e) => setReview(e.target.value)}
//           className="form-textarea mt-1 block w-full"
//           rows="2"
//         />
//       </label>

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
//       >
//         Submit Review
//       </button>
//     </div>
//   );
// };

// export default Bookreview;

import React, { useState } from 'react';
import StarRating from '../components/ui/star-rating';
import { useCreateReviewMutation } from '@/redux/api/apiSlice';

const Bookreview = ({ bookId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const [createReview, { data, isLoading, error, isSuccess }] =
    useCreateReviewMutation();

  const handleSubmit = () => {
    // Perform submission logic with review text and rating
    const formData = {
      bookId: bookId,
      rating: review,
      reviewText: rating,
    };
    createReview(formData);

    // Reset the form after submission
    setReview('');
    setRating(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>

      <label className="block mb-4">
        <span className="text-gray-700">Rating:</span>
        <StarRating initialRating={rating} onChange={handleRatingChange} />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Your Review:</span>
        <textarea
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="form-textarea mt-1 block w-full"
          rows="2"
        />
      </label>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Submit Review
      </button>

      {/* Display submitted reviews */}

      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Submitted Reviews:</h3>
      </div>
    </div>
  );
};

export default Bookreview;
