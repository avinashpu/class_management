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
                    className={activeLink === '/delete-car' ? 'active' : ''}
                    onClick={() => handleClick('/delete-car')}
                >
                    <Link to="/delete-car">Classroom</Link>
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
