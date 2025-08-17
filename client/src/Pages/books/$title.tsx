import { useParams } from '@tanstack/react-router';

export const BookPage = () => {
  const params = useParams({ from: '/books/$title' });

  return (
    <>
      <div>book page {params.title}</div>
    </>
  );
};
