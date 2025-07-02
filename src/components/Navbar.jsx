import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogInIcon, LogOut, Moon, Sun } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import logo from '../assets/image/logo.png'

const auth = getAuth(app);

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isScrolled, setIsScrolled] = useState(false);

  // Sticky shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.displayName || 'User'}!`);
    }
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged out successfully');
      })
      .catch((error) => {
        toast.error(`Logout failed: ${error.message}`);
      });
  };

  const navItemClass = ({ isActive }) =>
    `block px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
      isActive
        ? 'text-indigo-700 bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-200 shadow-md'
        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-800'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-500 backdrop-blur bg-white/70 dark:bg-gray-900/70 ${
        isScrolled ? 'shadow-xl' : 'shadow-none'
      }`}
    >
      <div className="max-w-11/12 mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className=" flex justify-center items-center text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 select-none"
          aria-label="EduBridge Logo"
        >
         <img src={logo} alt=""  className='w-20'/> EduBridge
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-2">
          {['/', '/find-tutors', '/add-tutor', '/my-tutors', '/bookings'].map(
            (path, idx) => {
              const labels = [
                'Home',
                'Find Tutors',
                'Add Tutor',
                'My Tutors',
                'My Booked',
              ];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={navItemClass}
                  onClick={() => setMenuOpen(false)}
                  end={path === '/'}
                >
                  {labels[idx]}
                </NavLink>
              );
            }
          )}
        </div>

        {/* Right side: Theme toggle + User */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-200 hover:ring-2 hover:ring-indigo-500 transition shadow-md"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* User section */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Profile with ring glow */}
              <div className="relative group">
                <img
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover cursor-pointer transition-transform transform group-hover:scale-110"
                />
                <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                  bg-indigo-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100
                  pointer-events-none transition-opacity select-none"
                >
                  {user.displayName || 'User'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-400 hover:bg-red-500 text-white rounded-full px-6 py-2 font-semibold shadow-lg transition"
                aria-label="Logout"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link
                to="/login"
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 font-semibold shadow-lg transition"
              >
                <LogInIcon size={18} />
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-7 py-2 font-semibold shadow-lg transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-xl px-6 py-7 space-y-6 border-t border-indigo-300 dark:border-indigo-700 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col space-y-3">
          {['/', '/find-tutors', '/add-tutor', '/my-tutors', '/bookings'].map(
            (path, idx) => {
              const labels = [
                'Home',
                'Find Tutors',
                'Add Tutor',
                'My Tutors',
                'My Booked',
              ];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `block px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                      isActive
                        ? 'text-indigo-700 bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-200 shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-800'
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                  end={path === '/'}
                >
                  {labels[idx]}
                </NavLink>
              );
            }
          )}
        </nav>

        <div className="flex items-center justify-between pt-5 border-t border-indigo-300 dark:border-indigo-700">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-200 hover:ring-2 hover:ring-indigo-500 transition shadow-md"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <>
              <span className="text-indigo-700 dark:text-indigo-300 font-semibold">
                {user.displayName || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-400 hover:bg-red-500 text-white rounded-full px-6 py-2 font-semibold shadow-lg transition"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 font-semibold shadow-lg transition"
              >
                <LogInIcon size={18} />
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-7 py-2 font-semibold shadow-lg transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
