'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface University {
  value: string;
  label: string;
}

export default function LoginPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');

  const getSigninUrl = () => {
    if (!selectedUniversity) return "/login/signin";
    const selectedUni = universities.find(uni => uni.value === selectedUniversity);
    const universityName = selectedUni?.label || selectedUniversity;
    const universityId = selectedUni?.value || selectedUniversity;
    return `/login/signin?university=${encodeURIComponent(universityName)}&universityId=${encodeURIComponent(universityId)}`;
  };

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          'https://81c8a33d-0c36-41ac-9406-426fd061bb05.mock.pstmn.io/retrive/uni'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch universities');
        }
        
        const data = await response.json();
        
        const formattedUniversities = Array.isArray(data) 
          ? data.map((uni: any) => ({
              value: uni.value || uni.id || String(uni),
              label: uni.label || uni.name || String(uni),
            }))
          : [];
        
        // Add placeholder option at the beginning
        setUniversities([
          { value: "", label: "Choose your university" },
          ...formattedUniversities,
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching universities:', err);
        // Fallback to empty array with placeholder
        setUniversities([{ value: "", label: "Choose your university" }]);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <div className="container bg-white rounded-4xl lg:justify-start lg:items-start md:justify-center md:items-center sm:justify-center sm:items-center mx-auto px-auto">
      <div className="flex flex-row justify-start items-start w-full sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start px-12 lg:mx-16 sm:mx-0 py-35 relative">
        {/* Left Section - Form */}
        <div className="flex flex-col sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start gap-8 border-4 border-secondary-border shadow-sm bg-white-light lg:px-8 py-6 sm:px-4 rounded-4xl object-contain">
          <div className="flex flex-col justify-start items-start pl-4 pr-10 mr-16 pt-5 gap-2">
            <h1 className="text-4xl font-bold text-primary-dark">
              Where are you studying?
            </h1>
            <p className="text-lg text-primary-dark">
              Already a member?{" "}
              <Link
                href="/login/signin"
                className="text-primary-dark font-semibold"
              >
                Sign in now!
              </Link>
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-start items-start gap-6 w-full px-4 pb-4">
            <form className="flex flex-col w-full gap-1">
              <label
                htmlFor="university"
                className="text-primary-dark text-lg font-medium"
              >
                University
              </label>
              <Select
                id="university"
                required
                placeholder={loading ? "Loading universities..." : "Choose your university"}
                options={universities}
                className={loading ? "opacity-50 cursor-not-allowed" : ""}
                value={selectedUniversity}
                onChange={(value) => setSelectedUniversity(value)}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">
                  {error}. Please refresh the page to try again.
                </p>
              )}
            </form>
            <Button 
              href={getSigninUrl()} 
              fullWidth 
              size="lg"
              disabled={!selectedUniversity}
            >
              Continue
            </Button>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="flex flex-col md-1:right-50 md-1:bottom-22 md-2:right-30 md-2:bottom-30 md-3:right-28 md-3:bottom-30 absolute">
          <div className="w-full">
            <Image
              src={withBasePath("/assets/images/login illustration.png")}
              alt="Login Illustration"
              width={200}
              height={200}
              className="object-fill sm-1:hidden md-3:block md-2:block md-1:block md-1:w-120 md-1:h-120 md-2:w-100 md-2:h-100 md-3:w-100 md-3:h-100"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
