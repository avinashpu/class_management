import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style.css';
import { API_URL } from '../../util'; 

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('/dashboard');
    const navigate = useNavigate();

    const handleClick = (link) => {
        setActiveLink(link);

        if (link === '/logout') {
            handleLogout();
        }
    };

    const handleLogout = async () => {
        try { 
            await axios.post(`${API_URL}/api/auth/logout`);
            navigate('/principlelogin');
        } catch (err) {
            console.error('Failed to log out:', err);
           
        }
    };

    return (
        <div>
            <header className="header">
                <h1>Classroom Management</h1>
            </header>
            <aside className="sidebar">
                <ul>
                    <li 
                        className={activeLink === '/' ? 'active' : ''}
                        onClick={() => handleClick('/')}
                    >
                        <Link to="/">Dashboard</Link>
                    </li>
                    
                    <li 
                        className={activeLink === '/createclassroom' ? 'active' : ''}
                        onClick={() => handleClick('/createclassroom')}
                    >
                        <Link to="/createclassroom">Create Classroom</Link>
                    </li>

                    <li 
                        className={activeLink === '/addteacher' ? 'active' : ''}
                        onClick={() => handleClick('/addteacher')}
                    >
                        <Link to="/addteacher">Add Teacher</Link>
                    </li>
                   
                    <li 
                        className={activeLink === '/addstudent' ? 'active' : ''}
                        onClick={() => handleClick('/addstudent')}
                    >
                        <Link to="/addstudent">Add Student</Link>
                    </li>

                    <li 
                        className={activeLink === '/teacherlist' ? 'active' : ''}
                        onClick={() => handleClick('/teacherlist')}
                    >
                        <Link to="/teacherlist">Teacher List</Link>
                    </li>

                    <li 
                        className={activeLink === '/studentlist' ? 'active' : ''}
                        onClick={() => handleClick('/studentlist')}
                    >
                        <Link to="/studentlist">Student List</Link>
                    </li>

                    <li 
                        className={activeLink === '/logout' ? 'active' : ''}
                        onClick={() => handleClick('/logout')}
                    >
                        <Link to="#">Log out</Link> {/* Use # to prevent navigation */}
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;
