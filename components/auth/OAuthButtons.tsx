'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    google: any;
    FB: any;
  }
}

export default function OAuthButtons() {
  const router = useRouter();
  const [loading, setLoading] = useState<'google' | 'facebook' | null>(null);

  const handleGoogleLogin = async () => {
    setLoading('google');
    try {
      // Load Google Sign-In script
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialize Google Sign-In
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        callback: handleGoogleCallback,
      });

      window.google.accounts.id.prompt();
    } catch (error) {
      console.error('Google Sign-In error:', error);
      toast.error('Failed to initialize Google Sign-In');
      setLoading(null);
    }
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      // Decode the credential (JWT)
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const userData = JSON.parse(jsonPayload);

      // Send to backend
      const res = await fetch('/api/auth/oauth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userData.sub,
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        router.push('/');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Google callback error:', error);
      toast.error('Authentication failed');
    } finally {
      setLoading(null);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading('facebook');
    try {
      // Check if App ID is configured
      const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
      if (!appId) {
        toast.error('Facebook OAuth is not configured. Please add NEXT_PUBLIC_FACEBOOK_APP_ID to your environment variables.');
        setLoading(null);
        return;
      }

      // Load Facebook SDK
      if (!window.FB) {
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        await new Promise((resolve) => {
          script.onload = () => {
            window.FB.init({
              appId: appId,
              cookie: true,
              xfbml: true,
              version: 'v18.0',
            });
            resolve(true);
          };
        });
      }

      window.FB.login(
        async (response: any) => {
          if (response.authResponse) {
            try {
              // Get user info
              window.FB.api('/me', { fields: 'id,name,email,picture' }, async (userData: any) => {
                const res = await fetch('/api/auth/oauth/facebook', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    picture: userData.picture?.data?.url,
                  }),
                });

                const data = await res.json();

                if (data.success) {
                  localStorage.setItem('token', data.token);
                  toast.success('Login successful!');
                  router.push('/');
                } else {
                  toast.error(data.message || 'Login failed');
                }
                setLoading(null);
              });
            } catch (error) {
              console.error('Facebook API error:', error);
              toast.error('Failed to get user information');
              setLoading(null);
            }
          } else {
            toast.error('Facebook login cancelled');
            setLoading(null);
          }
        },
        { scope: 'email,public_profile' }
      );
    } catch (error) {
      console.error('Facebook login error:', error);
      toast.error('Failed to initialize Facebook login');
      setLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleGoogleLogin}
          disabled={loading !== null}
          className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm font-medium">Google</span>
        </button>
        <div id="google-signin-button" className="hidden"></div>

        <button
          onClick={handleFacebookLogin}
          disabled={loading !== null}
          className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaFacebook className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium">Facebook</span>
        </button>
      </div>
    </div>
  );
}
