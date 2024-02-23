// UserRow.js

import React, { useState } from 'react';

const UserRow = ({ user, onDelete, onUpdate, isEditing, onEdit, onCancelEdit,isError }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <tr key={user._id}>
      <td>{isEditing ? <input type="text" name="username" value={updatedUser.username} onChange={handleChange} /> : user.username}</td>
      <td>{isEditing ? <input type="text" name="email" value={updatedUser.email} onChange={handleChange} /> : user.email}</td>
      <td>{isEditing ? <input type="text" name="fullName" value={updatedUser.fullName} onChange={handleChange} /> : user.fullName}</td>
      <td>
        {isEditing ? (
          <>
            <button onClick={() => onUpdate(updatedUser)}>Update</button>
            <button onClick={onCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => onEdit(user._id)}>Edit</button>
            <button onClick={() => onDelete(user._id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
