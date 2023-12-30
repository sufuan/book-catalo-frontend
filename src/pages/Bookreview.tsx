import React, { useState } from 'react';
import StarRating from '../components/ui/star-rating';
import { useCreateReviewMutation } from '@/redux/api/apiSlice';
import { useAppSelector } from '@/redux/hooks';

const Bookreview = ({ bookId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const [createReview, { isLoading, error, isSuccess }] =
    useCreateReviewMutation();

  const handleSubmit = async () => {
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Perform submission logic with review text and rating
      const formData = {
        bookId: bookId,
        rating: rating,
        reviewText: review,
      };

      // Make the API call
      await createReview(formData);

      // Reset the form after successful submission
      setReview('');
      setRating(0);
    } catch (error) {
      // Handle submission error if needed
      console.error('Error submitting review:', error);
    } finally {
      // Reset the submission state after completion
      setIsSubmitting(false);
    }
  };

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
        className={`${
          isLoading || isSubmitting || !user.email
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-blue-500'
        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800`}
        disabled={isLoading || isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>

      {/* Display error message if submission fails */}
      {error && (
        <div className="text-red-500 mt-2">
          Error submitting review.fill all input.
        </div>
      )}

      {/* Display success message if submission is successful */}
      {isSuccess && (
        <div className="text-green-500 mt-2">
          Review submitted successfully!
        </div>
      )}
    </div>
  );
};

export default Bookreview;
