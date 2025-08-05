
import dotenv from 'dotenv';
dotenv.config();
import { fetchBooksBySubject } from './fetchBooks';
import { booksDataDBInsert } from './utils/booksInsertHelper';
import { insertBooksDescriptionDB } from './insert-books/insertBookDescription';

const bookSubjects = [
  'mysytery',
  'fantasy',
  'science_fiction',
  'horror',
  'history',
  'thriller',
  'young_adult',
  'adventure',
  'historical_fiction',
  'classic_literature',
];

try {
  (async () => {
   
    // // insertiing data to books, book_authors, and relational table
    // for (const subject of bookSubjects){
    //   const books = await fetchBooksBySubject(subject);
    //   await booksDataDBInsert(books);
    // }

    // // updating books to add its description
    // insertBooksDescriptionDB();
 
  })();
} catch (err) {
  console.error(err);
}
