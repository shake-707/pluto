import { currentUserQuery } from '@/Shared/queries/currUser';

const Home = () => {
  const { data, isError, isLoading } = currentUserQuery();

  if (isLoading) return <div>Loading…</div>;

  if (isError) return <div>Something went wrong.</div>;

  return (
    <>
      <div>Home</div>
      {data ? <div>{data.user_name}</div> : <div>user not logged in</div>}
    </>
  );
};

export default Home;
