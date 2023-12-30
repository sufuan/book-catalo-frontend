import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { useCreateBooksMutation } from '@/redux/api/apiSlice';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '../components/ui/input';

export default function Createbook() {
  const { toast } = useToast();

  const [userInput, setUserInput] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    img: '',
    isbn: '',
    language: '',
    publisher: '',
    pages: '',
    summary: '',
  });

  const [createBooks, { isLoading, isSuccess, isError }] =
    useCreateBooksMutation();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    createBooks(userInput);
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: 'Book creation successful',
      });
    }

    if (isError) {
      toast({
        description: 'Book creation failed',
      });
    }
  }, [isSuccess, isError]);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-semibold mb-6">Create Book</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title:
            </label>
            <Input
              id="title"
              placeholder="Book Title"
              type="text"
              value={userInput.title}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              Author:
            </label>
            <Input
              id="author"
              placeholder="Author"
              type="text"
              value={userInput.author}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, author: e.target.value }))
              }
              required
            />

            <Input
              id="genre"
              placeholder="Genre"
              type="text"
              value={userInput.genre}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, genre: e.target.value }))
              }
              required
            />

            <Input
              id="publicationDate"
              placeholder="Publication Date"
              type="text"
              value={userInput.publicationDate}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  publicationDate: e.target.value,
                }))
              }
              required
            />

            <Input
              id="img"
              placeholder="Image URL"
              type="text"
              value={userInput.img}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, img: e.target.value }))
              }
              required
            />

            <Input
              id="isbn"
              placeholder="ISBN"
              type="text"
              value={userInput.isbn}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, isbn: e.target.value }))
              }
              required
            />

            <Input
              id="language"
              placeholder="Language"
              type="text"
              value={userInput.language}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  language: e.target.value,
                }))
              }
              required
            />

            <Input
              id="publisher"
              placeholder="Publisher"
              type="text"
              value={userInput.publisher}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  publisher: e.target.value,
                }))
              }
              required
            />

            <Input
              id="pages"
              placeholder="Number of Pages"
              type="text"
              pattern="[0-9]*" // Use a pattern to allow only numeric values
              inputMode="numeric" // Set the input mode to numeric
              value={userInput.pages}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                setUserInput((prev) => ({ ...prev, pages: numericValue }));
              }}
              required
            />

            <textarea
              id="summary"
              placeholder="Summary"
              value={userInput.summary}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, summary: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <Button disabled={isLoading} className="mt-4">
          {isLoading && <p>Loading...</p>}
          Submit
        </Button>
      </form>
    </div>
  );
}
