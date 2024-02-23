import React, { useState ,useEffect} from 'react'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import UserTable from './components/UserTable '
function App() {
  const [users, setUsers] = useState([]);
  const [isError,setIsError] = useState('')
  const [editingUserId, setEditingUserId] = useState(null);
  useEffect(() => {
    // Fetch all users on component mount
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/allusers');
      const data = await response.json();
      if (response.ok) {
        setUsers(data.data);
      } else {
        console.error('Error fetching users:', data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleRegistration = (newUser) => {
    // Add the newly registered user to the existing list of users
    setUsers([...users, newUser]);
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await fetch(`http://localhost:8000/users/updateprofile/${updatedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();
     
      if (response.ok) {
        // Update the user in the local state
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === updatedUser._id ? { ...user, ...updatedUser } : user))
        );
        // Cancel the editing state
        setIsError('')
        setEditingUserId(null);
      } else {
        setIsError(data.message)
        console.error(data.message );
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      const response = await fetch(`http://localhost:8000/users/delete/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        // Remove the deleted user from the list
        setUsers(users.filter((user) => user._id !== userId));
        
      } else {
        console.error('Error deleting user:', data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  return (
    <>
    <div className='maindiv'>
      <div className='onediv' style={{marginRight:'2%'}}>
        <RegistrationForm onRegistration={handleRegistration}/>
      </div>
      <div className='onediv'><UserTable  users={users} onDelete={handleDelete} onUpdate={handleUpdate} editingUserId ={editingUserId} setEditingUserId={setEditingUserId} isError={isError} setIsError={setIsError}/></div>
    </div>
    <div className='onediv' style={{marginTop:'2%'}}>Dekhlo</div>

 
    </>
  )
}

export default App