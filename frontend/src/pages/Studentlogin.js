import React, { useState } from 'react';  
// import './Loginpage.css';  
import Img from '../Asset/Images/student.jpg';  
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
    const validEmail = 'student@example.com'; // Replace this with a valid email for a student  
    const validPassword = 'student123'; // Replace this with a valid password for a student  

    if (email === validEmail && password === validPassword) {  
      setSuccess('Login successful!');  
      setError('');  

      // Navigate to the dashboard after successful login  
      navigate('/student-dashboard');  
    } else {  
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