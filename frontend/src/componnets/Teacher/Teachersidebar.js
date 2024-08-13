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
            navigate('/teacherlogin');
        } catch (err) {
            console.error('Logout failed:', err);
            
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
                        className={activeLink === '/classroom' ? 'active' : ''}
                        onClick={() => handleClick('/classroom')}
                    >
                        <Link to="/classroom">Classroom</Link>
                    </li>

                    <li 
                        className={activeLink === '/add-student' ? 'active' : ''}
                        onClick={() => handleClick('/add-student')}
                    >
                        <Link to="/add-student">Add Student</Link>
                    </li>
                   
                    <li 
                        className={activeLink === '/logout' ? 'active' : ''}
                        onClick={() => handleClick('/logout')}
                    >
                        <Link to="#">Log out</Link> 
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;
