import { currentUserQuery } from '@/Shared/queries/currUser';
import { useNavigate } from '@tanstack/react-router';
import { useParams } from '@tanstack/react-router';

const Account = () => {
  const navigate = useNavigate();
  const { data, isLoading } = currentUserQuery();
  const params = useParams({from: '/account/$username'});
  if (isLoading) return <div>loading ...</div>;
  if (!isLoading && !data) {
    console.log('not logged in');
    navigate({
      from: '/account/$username',
      to: '/',
    });
  }
  

  return (
    <>
      <div>
        <div>
          <span>Account Pages</span>
        </div>
        {data ? (
          <>
            <div>{params.username}</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Account;
