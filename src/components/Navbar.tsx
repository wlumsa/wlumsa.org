import logo from "public/logo.png"
const Navbar: React.FC = () => {
   

    return (
        <div className="navbar bg-primary fixed top-0 z-30 rounded-b-3xl">
            {/* Mobile */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden text-base-100 hover:scale-105 duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52 text-base-100">
                        <li><a href="#news">Latest News</a></li>
                        <li><a href="#prayer_info">Prayer Information</a></li>
                        <li><a href="#events">Weekly Events</a></li>
                        <li><a href="#member">Membership</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl text-base-100" href="#hero">
                    <img src={logo.src} alt="WLU MSA Logo" className="h-8 w-8 hover:scale-105 duration-200" />
                </a>
            </div>
            {/* Desktop */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-base-100">
                        <li><a className="hover:scale-105 duration-200" href="#news">Latest News</a></li>
                        <li><a className="hover:scale-105 duration-200" href="#prayer_info">Prayer Information</a></li>
                        <li><a className="hover:scale-105 duration-200" href="#events">Weekly Events</a></li>
                        <li><a className="hover:scale-105 duration-200" href="#member">Membership</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a href="https://docs.google.com/document/d/1OOn5P8qV7D8u0Gv59DLhAq8jBkMRxLkSQPPwuc3IMN0/edit?usp=sharing" 
                   target='_blank' rel='noopener noreferrer' className="btn btn-ghost text-secondary hover:scale-105 duration-200">
                    Donate
                </a>
            </div>
        </div>
    );
}

export default Navbar;