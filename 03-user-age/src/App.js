import { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [users, setUsers] = useState([]);

  const addUserHandler = addedUser => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers.unshift(addedUser);
      return updatedUsers;
    });
  };

  return (
    <>
      <AddUser users={users} addUserHandler={addUserHandler} />
      <UsersList users={users} />
    </>
  );
}

export default App;
