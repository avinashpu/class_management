import React, { useState } from 'react';  
// import './Loginpage.css';  
import Img from '../Asset/Images/teacher.jpg';  
import { useNavigate } from 'react-router-dom';   

const LoginPage = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');  
  const [success, setSuccess] = useState('');  
  const navigate = useNavigate();   

  const handleSubmit = (e) => {  
    e.preventDefault();  

    // Simulate a successful login for a specific user  
    // It's best to fetch these credentials from an API in a production environment  
    const validEmail = 'teacher@example.com'; // Replace with a valid email for demo  
    const validPassword = 'password123'; // Replace with a valid password for demo  

    // Validate user credentials  
    if (email === validEmail && password === validPassword) {  
      setSuccess('Login successful!');  
      setError('');  

      // Navigate to the dashboard after successful login  
      navigate('/dashboard');  
    } else {  
      setError('Failed to log in. Please try again.');  
      setSuccess('');  
    }  
  };  

  return (  
    <div className="login-container">   
      <div className="image-container">  
        <img src={Img} alt="Teacher Profile" />   
      </div>  
      <div className="login-form">  
        <h1>Welcome back!</h1>  
        <p>Log in as Teacher.</p>  
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