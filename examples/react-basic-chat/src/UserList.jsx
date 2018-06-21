import React from 'react';
import User from './User';

const UserList = ({ users }) => {
  const allUsers = users.map( user => (
    <li key={user}><User user={user}/></li>
  ));
  return (
    <ul className='user-list'>
      {allUsers}
    </ul>
  );
};
export default UserList;
