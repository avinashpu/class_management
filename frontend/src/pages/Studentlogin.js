import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../Asset/Images/student.jpg';
import { API_URL } from '../util';  // Import the API URL
import axios from 'axios';  // Import axios for API calls

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      // Check if the login was successful
      if (response.status === 200 && response.data.success) {
        setSuccess('Login successful!');
        setError('');

        // Navigate to the student dashboard after successful login
        navigate('/studentsidebar');
      } else {
        setError('Failed to log in. Please try again.');
        setSuccess('');
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={Img} alt="Student Profile" />
      </div>
      <div className="login-form">
        <h1>Welcome back!</h1>
        <p>Log in Student.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log in</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
