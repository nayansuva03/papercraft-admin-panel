import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const getLinkClass = ({ isActive }) =>
        `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${isActive
            ? "text-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 dark:text-indigo-400 font-semibold"
            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
        }`;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Navbar Bar */}
                <div className="flex justify-between h-16 items-center">

                    {/* Left Side: Brand Title */}
                    <NavLink
                        to="/"
                        className="flex items-center text-xl font-extrabold tracking-tight hover:opacity-90 transition-opacity"
                    >
                        <span className="font-extrabold text-slate-800 dark:text-white text-xl tracking-tight">
                            PaperCraft <span className="text-indigo-600 dark:text-indigo-400">Admin Panel</span>
                        </span>
                    </NavLink>

                    {/* Right Side: Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        <NavLink to="/" className={getLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/dashboard" className={getLinkClass}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/users" className={getLinkClass}>
                            Users
                        </NavLink>
                        <NavLink to="/feedback" className={getLinkClass}>
                            Feedback
                        </NavLink>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top duration-200">
                        <div className="flex flex-col space-y-1">
                            <NavLink
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className={getLinkClass}
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className={getLinkClass}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/users"
                                onClick={() => setMenuOpen(false)}
                                className={getLinkClass}
                            >
                                Users
                            </NavLink>

                            <NavLink
                                to="/feedback"
                                onClick={() => setMenuOpen(false)}
                                className={getLinkClass}
                            >
                                Feedback
                            </NavLink>
                        </div>
                    </div>
                )}

            </div>
        </nav>
    );
}

export default Navbar;