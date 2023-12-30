import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  useGetSingleBooksQuery,
  useUpdateBooksMutation,
} from '@/redux/api/apiSlice';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useGetSingleBooksQuery } from 'your-api'; // Replace 'your-api' with the actual import

const UpdateBook = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useGetSingleBooksQuery(id);
  const [formData, setFormData] = useState({});

  const { toast } = useToast();

  const [updatebookData, { isError, error, isSuccess }] =
    useUpdateBooksMutation();

  useEffect(() => {
    if (isSuccess) {
      alert('Book Updated Successfully');
    }

    if (isError) {
      toast({
        description: 'Book creation failed',
      });
    }
  }, [isSuccess, isError, toast, updatebookData]);

  useEffect(() => {
    if (book?.data) {
      setFormData({
        id: book.data._id || '',
        title: book.data.title || '',
        author: book.data.author || '',
        img: book.data.img || '',
        isbn: book.data.isbn || '',
        language: book.data.language || '',
        pages: book.data.pages || '',
        publisher: book.data.publisher || '',
        publicationDate: book.data.publicationDate || '',
        summary: book.data.summary || '',
      });
    }
  }, [book]);

  //   formData && console.log('formData:', formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Data:', formData);
    updatebookData(formData);
    toast({
      description: 'Test Toast',
    });
  };

  if (isLoading) {
    // Handle loading state if needed
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded shadow-md"
      >
        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Author:</span>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Image URL:</span>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">ISBN:</span>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Language:</span>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Pages:</span>
          <input
            type="text"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Publisher:</span>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Publication Date:</span>
          <input
            type="text"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Summary:</span>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="form-textarea mt-1 block w-full"
            rows="4" // Adjust the number of rows as needed
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
