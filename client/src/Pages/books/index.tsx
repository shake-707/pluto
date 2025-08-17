import { booksQuery } from '@/Entities/books/queries/books';

const BookPage = () => {
  const { data: bookData, isError, isLoading } = booksQuery();

  if (isError) return <div>error ...</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div>Books Page</div>
      {bookData ? (
        <div>
          {bookData.map((book) => (
            <div>title: {book.title} <br /> author: {book.authors[0]} </div> 
          ))}
        </div>
      ) : null}
    </>
  );
};

export default BookPage;
