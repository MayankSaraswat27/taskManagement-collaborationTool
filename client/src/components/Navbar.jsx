import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';


export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useApp();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Working', path: '/#working' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Trackify
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isHomePage && navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            

            {location.pathname === '/' && (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </>
            )}

            {location.pathname === '/dashboard' && (
              <Link to="/">
                <Button variant="outline" size="sm">Logout</Button>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="px-4 py-4 space-y-3">
            {isHomePage && navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 space-y-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};