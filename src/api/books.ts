import pick from 'ramda/es/pick';

export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}

export const googleBookToBookSource = (book: any): GoogleBook => {
  const { id, ...data } = book;

  return {
    id,
    volumeInfo: pick<GoogleBook['volumeInfo'], string>(
      ['title', 'authors', 'publisher', 'description', 'imageLinks'],
      data.volumeInfo,
    ),
  };
};

export const searchBooks = async (query: string): Promise<GoogleBook[]> => {
  try {
    const results = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query,
      )}`,
    );
    const json = await results.json();
    return (json.items as GoogleBook[]).filter(
      (book) => book.volumeInfo.imageLinks?.thumbnail,
    );
  } catch (err) {
    return [];
  }
};

export const getInternalBookId = async (
  book: GoogleBook,
): Promise<string | null> => {
  try {
    const results = await fetch('https://api.booksy.app/api/add-book', {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await results.json();
    return json.id;
  } catch (err) {
    console.error(err);
    return null;
  }
};
