// UserTable.js
import React from 'react';
import UserRow from './UserRow';

const UserTable = ({ users, onDelete, onUpdate, editingUserId, setEditingUserId, isError, setIsError }) => {
  
  const handleEdit = (userId) => {
    setIsError('');
    setEditingUserId(userId);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setIsError('');
  };

  return (
    <div>
      <h2>User Table</h2>
      {isError && <p style={{ color: 'red' }}>{isError}</p>}
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              onDelete={onDelete}
              onUpdate={onUpdate}
              isEditing={user._id === editingUserId} // Check if the current user is being edited
              onEdit={handleEdit}
              onCancelEdit={handleCancelEdit}
              isError={isError}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
