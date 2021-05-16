import { useContext, useEffect, useState } from 'react';
import { User } from '../../../services';
import { ServiceContext } from '../../../services/Context';

export const Main = () => {

  const [users, setUsers] = useState([] as User[]);

  const { userService } = useContext(ServiceContext);

  useEffect(() => {
    userService.getUsers()
      .then(users => {
        setUsers(users);
      })
  }, [userService]);

  const buildUserList = () => {
    if (!users || users.length === 0) {
      return <span className='loading'>Loading...</span>;
    }
    const userList = users.map(user => {
      return <li key={'user-' + user.username}>{user.username}: {user.firstname} {user.lastname}</li>
    });
    return <ol>{userList}</ol>
  }

  const userList = buildUserList();

  return (
    <main>
      <span>List of users:</span>
      {userList}
    </main>
  );
}