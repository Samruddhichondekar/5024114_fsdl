import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const { isDark, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="nav-brand">
                    <Leaf className="nav-icon" />
                    <span>EcoSwap <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pro</span></span>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                    <li><Link to="/browse" className={location.pathname === '/browse' ? 'active' : ''}>Browse</Link></li>
                    <li><Link to="/my-items" className={location.pathname === '/my-items' ? 'active' : ''}>My Items</Link></li>
                    <li>
                        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </li>
                    <li><Link to="/add" className="btn btn-primary nav-btn">Add Item</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
