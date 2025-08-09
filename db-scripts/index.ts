import dotenv from 'dotenv';
dotenv.config();
import { fetchBooksBySubject } from './fetchBooks';
import { booksDataDBInsert } from './utils/booksInsertHelper';
import { insertBooksDescriptionDB } from './insert-books/insertBookDescription';

const bookSubjects = [
  'mystery',
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

// (async () => {
//   try {
//     for (const subject of bookSubjects) {
//       const books = await fetchBooksBySubject(subject);
//       await booksDataDBInsert(books);
//     }

//     await insertBooksDescriptionDB();
//   } catch (err) {
//     console.error('Error in script:', err);
//   }
// })();
