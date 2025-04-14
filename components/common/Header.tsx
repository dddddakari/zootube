'use client';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setIsLoggedIn(user?.isAuthenticated || false);
      }
    };

    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <header className="bg-yellow-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 py-3">
            <Link href="/" className="text-4xl font-extrabold">
              ZooTube
            </Link>
          </div>

          <div className="flex items-center space-x-4 font-extrabold text-xl">
            <Link href="/help" className="hover:text-green-200 transition">
              Help
            </Link>
            
            {isLoggedIn && (
              <Link href="/favourite" className="hover:text-green-200 transition">
                <span className="hidden md:inline">Favorites</span>
                <FiHeart size={20} className="md:hidden" />
              </Link>
            )}
            <Link href="/donate" className="hover:text-green-200 transition">
              <span className="hidden md:inline">Donate :)</span>
              <FiHeart size={20} className="md:hidden" />
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="hover:text-green-200 transition">
                  <span className="hidden md:inline ml-1">My Account</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="hover:text-green-200 transition text-xl font-extrabold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth" className="hover:text-green-200 transition">
                <span className="hidden md:inline ml-1">My Account</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}