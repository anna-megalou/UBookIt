'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-blue-900 mb-2">
                  Enter your credentials
                </h1>
                <p className="text-gray-600">
                  Already a member?{' '}
                  <Link href="/login" className="text-blue-900 hover:underline">
                    Sign in now!
                  </Link>
                </p>
              </div>

              <div>
                <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                  University
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value="Athens University of Economics and Business"
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                  <div className="absolute right-3 top-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">U</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="pt-4">
                <button className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                  Sign In
                </button>
              </div>

              <div className="text-center text-sm text-gray-600">
                by signing in you accept the{' '}
                <Link href="/terms" className="text-blue-900 hover:underline">
                  terms and conditions
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              {/* Student with Laptop Illustration */}
              <div className="text-center">
                <div className="w-32 h-32 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍💻</span>
                </div>
                <div className="space-y-2">
                  <div className="w-16 h-4 bg-blue-600 rounded mx-auto"></div>
                  <div className="w-12 h-4 bg-blue-600 rounded mx-auto"></div>
                  <div className="w-14 h-4 bg-blue-600 rounded mx-auto"></div>
                </div>
                {/* Floating books */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded"></div>
                <div className="absolute top-8 -right-8 w-6 h-6 bg-blue-500 rounded"></div>
                <div className="absolute top-16 -right-4 w-7 h-7 bg-blue-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
