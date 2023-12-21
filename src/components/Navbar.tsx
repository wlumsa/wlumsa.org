import Link from "next/link";
import React, { useState, useRef } from 'react';
import logo from "public/logo.png";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Navbar: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);
  
    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const isDark = currentTheme === 'dark';
    
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      
      if (navbarRef.current) {
        navbarRef.current.classList.toggle('navbar-light', !isDark);
        navbarRef.current.classList.toggle('navbar-dark', isDark);
      }
    };


  return (
    <div ref={navbarRef} className="navbar bg-primary fixed top-0 z-30 rounded-b-3xl sm:w-full">
      {/* Mobile */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-base-100 hover:scale-105 duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52 text-base-100">
            <li><Link href="/#prayer_info" className="hover:scale-105 duration-200">Prayer Info</Link></li>
            <li><Link href="/events" className="hover:scale-105 duration-200">Events</Link></li>
            <li><Link href="/about" className="hover:scale-105 duration-200">About us</Link></li>
            <li><Link href="/resources" className="hover:scale-105 duration-200">Resources</Link></li>
            <li><Link href="/#member" className="hover:scale-105 duration-200">Member Signup</Link></li>
            
        
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl text-base-100">
          <img src={logo.src} alt="Logo" className="h-8 w-8 hover:scale-105 duration-200" />
        </Link>
      </div>
      {/* Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base-100">
          <li><Link href="/#prayer_info" className="hover:scale-105 duration-200">Prayer Info</Link></li>
          <li><Link href="/events" className="hover:scale-105 duration-200">Events</Link></li>
          <li><Link href="/about" className="hover:scale-105 duration-200">About us</Link></li>
          <li><Link href="/resources" className="hover:scale-105 duration-200">Resources</Link></li>
          <li><Link href="/#member" className="hover:scale-105 duration-200">Member Signup</Link></li>
          <li onClick={toggleTheme} className="cursor-pointer my-2">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </li>

        </ul>
      </div>
      <div className="navbar-end">
        <Link href="https://docs.google.com/document/d/1OOn5P8qV7D8u0Gv59DLhAq8jBkMRxLkSQPPwuc3IMN0/edit?usp=sharing" className="btn btn-ghost text-secondary hover:scale-105 duration-200">
          Donate
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
