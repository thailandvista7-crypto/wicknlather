'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-primary-green text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          Stay Connected
        </h2>
        <p className="text-lg mb-8 text-primary-cream">
          Subscribe to our newsletter for exclusive offers, new product launches, and
          wellness tips.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-cream"
            required
          />
          <button
            type="submit"
            className="bg-primary-amber text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
