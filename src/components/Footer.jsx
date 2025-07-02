import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkClass = ({ isActive }) =>
    `block transition-colors duration-300 hover:text-indigo-500 ${
      isActive ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-gray-600 dark:text-gray-300'
    }`;

  return (
    <footer className="bg-gradient-to-tr from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-indigo-300 dark:border-indigo-700 shadow-inner select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 text-gray-700 dark:text-gray-300">
        
        {/* Logo & Description */}
        <div className="space-y-3">
          <NavLink to="/" className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wide">
            EduBridge
          </NavLink>
          <p className="text-sm leading-relaxed opacity-90">
            Your trusted platform to connect with top tutors and grow your learning journey.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold border-b-2 border-indigo-500 w-max pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/find-tutors" className={linkClass}>Find Tutors</NavLink></li>
            <li><NavLink to="/add-tutor" className={linkClass}>Add Tutor</NavLink></li>
            <li><NavLink to="/my-tutors" className={linkClass}>My Tutors</NavLink></li>
            <li><NavLink to="/bookings" className={linkClass}>My Booked</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-4 text-lg font-semibold border-b-2 border-indigo-500 w-max pb-1">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="text-indigo-600 dark:text-indigo-400" size={18} />
              <span>support@edubridge.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-indigo-600 dark:text-indigo-400" size={18} />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="text-indigo-600 dark:text-indigo-400" size={18} />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-4 text-lg font-semibold border-b-2 border-indigo-500 w-max pb-1">
            Follow Us
          </h3>
          <div className="flex space-x-5 mt-2">
            {[
              { href: 'https://www.facebook.com/', label: 'Facebook', icon: <Facebook size={22} /> },
              { href: 'https://x.com/?lang=en', label: 'Twitter', icon: <Twitter size={22} /> },
              { href: 'https://www.linkedin.com/feed/', label: 'LinkedIn', icon: <Linkedin size={22} /> },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-700 text-indigo-600 dark:text-indigo-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-shadow shadow-md"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-indigo-300 dark:border-indigo-700 py-5 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 select-text">
        &copy; {currentYear} EduBridge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
