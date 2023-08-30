import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "../firebase";

const Navbar: React.FC = () => {
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        const fetchLogoUrl = async () => {
            const logoRef = ref(storage, 'gs://wlumsa-7effb.appspot.com/images/logo.png');
            const url = await getDownloadURL(logoRef);
            setLogoUrl(url);
        }

        fetchLogoUrl();
    }, []);

    return (
        <div className="navbar bg-primary fixed top-0 z-30 rounded-b-3xl">
            {/* Mobile */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden text-base-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52 text-base-100">
                        <li><a href="#news">News</a></li>
                        <li><a href="#prayer_info">Prayer Info</a></li>
                        <li><a href="#events">Weekly Events</a></li>
                        <li><a href="#member">Member Signup</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl text-base-100">
                    <img src={logoUrl} alt="WLU MSA Logo" className="h-8 w-8" />
                </a>
            </div>
            {/* Desktop */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-base-100">
                        <li><a href="#news">News</a></li>
                        <li><a href="#prayer_info">Prayer Info</a></li>
                        <li><a href="#events">Weekly Events</a></li>
                        <li><a href="#member">Member Signup</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a href = "https://docs.google.com/document/d/1OOn5P8qV7D8u0Gv59DLhAq8jBkMRxLkSQPPwuc3IMN0/edit?usp=sharing"className="btn btn-ghost text-secondary">Donate</a>
            </div>
        </div>
    );
}

export default Navbar;