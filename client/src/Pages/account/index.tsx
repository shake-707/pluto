import { currentUserQuery } from '../../Shared/queries/currUser';
import { useNavigate } from '@tanstack/react-router';

const Account = () => {
  const navigate = useNavigate();
  const { data, isLoading } = currentUserQuery();

  if (isLoading) return <div>loading ...</div>;
  if (!isLoading && !data) {
    console.log('not logged in');
    navigate({
      from: '/account',
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
            <div>{data.user_name}</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Account;
