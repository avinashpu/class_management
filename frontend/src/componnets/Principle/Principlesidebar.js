import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('/dashboard');

    const handleClick = (link) => {
        setActiveLink(link);
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
                    className={activeLink === '/update-car' ? 'active' : ''}
                    onClick={() => handleClick('/update-car')}
                >
                    <Link to="/update-car">Create Classroom</Link>
                </li>

                <li 
                    className={activeLink === '/add-teacher' ? 'active' : ''}
                    onClick={() => handleClick('/add-teacher')}
                >
                    <Link to="/add-car">Add Teacher</Link>
                </li>
               
                <li 
                    className={activeLink === '/delete-car' ? 'active' : ''}
                    onClick={() => handleClick('/delete-car')}
                >
                    <Link to="/delete-car">Add Student</Link>
                </li>

                <li 
                    className={activeLink === '/delete-car' ? 'active' : ''}
                    onClick={() => handleClick('/delete-car')}
                >
                    <Link to="/delete-car">Teacher List</Link>
                </li>

                <li 
                    className={activeLink === '/delete-car' ? 'active' : ''}
                    onClick={() => handleClick('/delete-car')}
                >
                    <Link to="/delete-car">Student  List</Link>
                </li>

                <li 
                    className={activeLink === '/delete-car' ? 'active' : ''}
                    onClick={() => handleClick('/delete-car')}
                >
                    <Link to="/delete-car">Log out</Link>
                </li>
               
            </ul>
        </aside>
        </div>
    );
};

export default Sidebar;
