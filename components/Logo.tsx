'use client';

import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        {/* Candle Icon */}
        <svg
          width={size === 'sm' ? 28 : size === 'md' ? 36 : 48}
          height={size === 'sm' ? 28 : size === 'md' ? 36 : 48}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-green"
        >
          {/* Candle Body */}
          <rect x="18" y="8" width="12" height="32" rx="2" fill="currentColor" />
          {/* Candle Wax Drips */}
          <path
            d="M20 12 L22 10 L24 12 L26 10 L28 12"
            stroke="#D4A574"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M22 20 L24 18 L26 20"
            stroke="#D4A574"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Flame */}
          <ellipse cx="24" cy="6" rx="3" ry="4" fill="#FFA500" />
          <ellipse cx="24" cy="5" rx="2" ry="3" fill="#FFD700" />
          {/* Wick */}
          <line x1="24" y1="8" x2="24" y2="4" stroke="#4A5D23" strokeWidth="1.5" />
        </svg>
        {/* Soap Bubbles */}
        <div className="absolute -bottom-1 -right-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" fill="#F5F5DC" opacity="0.8" />
            <circle cx="6" cy="6" r="2" fill="white" opacity="0.6" />
          </svg>
        </div>
      </div>
      <span
        className={`font-serif font-bold text-primary-green ${sizeClasses[size]} tracking-tight`}
      >
        Wick & Lather
      </span>
    </Link>
  );
}
