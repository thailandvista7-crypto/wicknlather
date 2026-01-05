'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const hydrate = useCartStore((state) => state.hydrate);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user);
          }
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo size="md" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-green transition">
              Home
            </Link>
            <Link href="/shop/soaps" className="text-gray-700 hover:text-primary-green transition">
              Soaps
            </Link>
            <Link href="/shop/candles" className="text-gray-700 hover:text-primary-green transition">
              Candles
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-green transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-green transition">
              Contact
            </Link>
            {user && (
              <Link href="/dashboard" className="text-gray-700 hover:text-primary-green transition">
                Track My Order
              </Link>
            )}

            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative">
                <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary-green transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative group">
                  <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                    <FiUser className="w-6 h-6 text-gray-700 hover:text-primary-green transition" />
                  </Link>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      href={user.role === 'admin' ? '/admin' : '/dashboard'}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-cream"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-cream"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-primary-green transition">
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <FiShoppingCart className="w-6 h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-green"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:bg-primary-cream"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop/soaps"
              className="block px-3 py-2 text-gray-700 hover:bg-primary-cream"
              onClick={() => setIsOpen(false)}
            >
              Soaps
            </Link>
            <Link
              href="/shop/candles"
              className="block px-3 py-2 text-gray-700 hover:bg-primary-cream"
              onClick={() => setIsOpen(false)}
            >
              Candles
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-primary-cream"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-700 hover:bg-primary-cream"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-gray-700 hover:bg-primary-cream"
                onClick={() => setIsOpen(false)}
              >
                Track My Order
              </Link>
            )}
            {user ? (
              <>
                <Link
                  href={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="block px-3 py-2 text-gray-700 hover:bg-primary-cream"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-primary-cream"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 text-gray-700 hover:bg-primary-cream"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
