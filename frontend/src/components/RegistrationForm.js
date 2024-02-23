import React, { useState } from 'react';
import { Base_URL } from './server';

const RegistrationForm = ({onRegistration}) => {
  const [iserror, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Add your registration logic here
    try {
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData.message);
      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed');
      }

      // Notify the parent component about the registration
      onRegistration(responseData.data);
      setFormData({
        email: '',
        fullName: '',
        username: '',
      });
    } catch (error) {
      console.error(error);
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {iserror && <p style={{ color: 'red' }}>{iserror}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label style={{ width: '100%' ,padding:'4px'  }}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%' ,padding:'4px' }}
            required
          />
        </label>

        <label style={{ width: '100%' ,padding:'4px'  }}>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={{ width: '100%' ,padding:'4px' }}
            required
          />
        </label>

        <label style={{ width: '100%' ,padding:'4px' }}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%' ,padding:'4px'  }}
            required
          />
        </label>

        <button type="submit" style={{ width: '30%', margin: 'auto', marginTop: '20px',marginBottom:'8px' }}>
          Register
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
