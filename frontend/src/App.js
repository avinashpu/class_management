import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
};

export default App;
