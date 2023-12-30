import { useEffect, useState } from 'react';
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

  const [createBooks, { data, isLoading, error, isError, isSuccess }] =
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
  }, [isSuccess, error, data]);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
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
            <Button disabled={isLoading}>
              {isLoading && <p>loading</p>}
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-10"></div>
    </div>
  );
}
