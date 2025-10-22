'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UniversitySelection() {
  const [selectedUniversity, setSelectedUniversity] = useState('');

  const universities = [
    'Athens University of Economics and Business',
    'National and Kapodistrian University of Athens',
    'Aristotle University of Thessaloniki',
    'University of Patras',
    'University of Crete',
    'University of Ioannina',
    'University of Thessaly',
    'University of Macedonia',
    'University of the Aegean',
    'Democritus University of Thrace'
  ];

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-blue-900 mb-2">
                  Where are you studying?
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
                    id="university"
                    value={selectedUniversity}
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                    placeholder="Choose your university"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    list="universities"
                  />
                  <datalist id="universities">
                    {universities.map((university) => (
                      <option key={university} value={university} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/login"
                  className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-blue-800 transition-colors inline-block"
                >
                  Continue
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
