import { useState } from 'react';
import AddUser from './components/Users/AddUser';

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
    <div>
      <AddUser users={users} addUserHandler={addUserHandler} />
    </div>
  );
}

export default App;
