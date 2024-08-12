// Navbar.jsx  

import React from 'react';  
import { Navbar, Nav } from 'react-bootstrap';  
import { Link } from 'react-router-dom';  

const NavigationBar = () => {  
  return (  
    <Navbar bg="light" expand="lg">  
      <Navbar.Brand as={Link} to="/">School Management System</Navbar.Brand>  
      <Nav className="ml-auto">  
        <Nav.Link as={Link} to="/principal">Principal</Nav.Link>  
        <Nav.Link as={Link} to="/teacher">Teacher</Nav.Link>  
        <Nav.Link as={Link} to="/student">Student</Nav.Link>  
      </Nav>  
    </Navbar>  
  );  
};  

export default NavigationBar;