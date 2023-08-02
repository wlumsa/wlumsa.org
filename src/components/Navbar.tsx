const Navbar: React.FC = () => {
    return (
        <div className="navbar bg-primary fixed top-0 z-30 rounded-b-3xl">
            {/* Mobile */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden text-base-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52 text-base-100">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl text-base-100">WLU MSA</a>
            </div>
            {/* Desktop */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-base-100">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-ghost text-secondary">Donate</a>
            </div>
        </div>
    );
}

export default Navbar;