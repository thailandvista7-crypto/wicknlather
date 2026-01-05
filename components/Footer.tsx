import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Wick & Lather</h3>
            <p className="text-gray-300">
              Premium handmade soaps and candles crafted with natural ingredients and care.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-primary-cream transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop/soaps" className="hover:text-primary-cream transition">
                  Soaps
                </Link>
              </li>
              <li>
                <Link href="/shop/candles" className="hover:text-primary-cream transition">
                  Candles
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary-cream transition">
                  Track My Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-primary-cream transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-cream transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-cream transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-cream transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="text-gray-300 hover:text-primary-cream transition"
                aria-label="Facebook"
              >
                <FiFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-cream transition"
                aria-label="Instagram"
              >
                <FiInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-cream transition"
                aria-label="Twitter"
              >
                <FiTwitter className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for updates and special offers.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Wick & Lather. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
