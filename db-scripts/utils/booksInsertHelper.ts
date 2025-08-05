import { OpenLibWork } from '../fetchBooks';
import { insertBookDB } from '../insert-books/insert-books-db';
import { insertBooksAuthorsDB } from '../insert-book-authors/insertBookAuthors';
import { insertBooksAuthorsJoinDB } from '../insert-books/insertBooksAuthorsJoin';

export const booksDataDBInsert = async (booksData: OpenLibWork[]) => {
  try {
    for (const book of booksData) {
      await insertBookDB({
        key: book.key,
        title: book.title,
        cover_id: book.cover_id,
        year_released: book.first_publish_year,
      });

      if (book.authors) {
        for (const author of book.authors) {
          await insertBooksAuthorsDB({
            key: author.key,
            name: author.name,
          });

          await insertBooksAuthorsJoinDB({
            author_key: author.key,
            book_key: book.key,
          });
        }
      }
    }
  } catch (err) {
    throw err;
  }
};
