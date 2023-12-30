import { Button } from '@/components/ui/button';
import {
  useDeleteBooksMutation,
  useGetSingleBooksQuery,
} from '@/redux/api/apiSlice';
import Bookreview from './Bookreview';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const { data: book, isLoading } = useGetSingleBooksQuery(id);
  const [deletebookid, { isError, error, isSuccess }] =
    useDeleteBooksMutation();

  if (isLoading) {
    // Handle loading state if needed
    return <div className="text-center mt-8">Loading...</div>;
  }

  const handleDeleteButtonClick = () => {
    // Show a confirmation dialog
    const userConfirmed = window.confirm(
      'Are you sure you want to delete the book?'
    );

    // Check if the user confirmed
    if (userConfirmed) {
      deletebookid(id);

      // Delete the book
      // ...
    }
  };

  if (isSuccess) {
    navigate('/');
  }

  return (
    <div className="max-w-7xl mx-auto flex items-center border-b border-gray-300 p-8">
      <div className="w-1/2">
        <img src={book?.data?.img} alt={book?.data?.title} className="w-full" />
      </div>
      <div className="w-1/2 space-y-3 pl-8">
        <h1 className="text-3xl font-semibold mb-2">{book?.data?.title}</h1>
        <p className="text-xl">Rating: {book?.rating}</p>

        {/* Additional Details */}
        <p>
          <strong>Author:</strong> {book?.data?.author}
        </p>
        <p>
          <strong>Genre:</strong> {book?.data?.genre}
        </p>
        <p>
          <strong>ISBN:</strong> {book?.data?.isbn}
        </p>
        <p>
          <strong>Language:</strong> {book?.data?.language}
        </p>
        <p>
          <strong>Pages:</strong> {book?.data?.pages}
        </p>
        <p>
          <strong>Publication Date:</strong>{' '}
          {new Date(book?.data?.publicationDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Publisher:</strong> {book?.data?.publisher}
        </p>
        <p>
          <strong>Summary:</strong> {book?.data?.summary}
        </p>

        {/* Display Reviews */}
        {book.data.reviews.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Reviews:</h2>
            {book.data.reviews.map((review) => (
              <div key={review._id} className="mb-4">
                <p className="text-lg font-semibold">Rating: {review.rating}</p>
                <p>Review Text: {review.reviewText}</p>
                <hr className="my-2" />
              </div>
            ))}
          </div>
        )}

        <div className="space-x-4 mt-4">
          {user.email ? (
            <Link to={`/update-book/${book?.data._id}`}>
              <Button disabled={!user.email}>Update Book</Button>
            </Link>
          ) : (
            <Button disabled>Update Book</Button>
          )}
          <Button
            onClick={handleDeleteButtonClick}
            disabled={!user.email}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red active:bg-red-800"
          >
            Delete Book
          </Button>
        </div>
      </div>
      <Bookreview bookId={id} />
    </div>
  );
}
