'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [universityValue, setUniversityValue] = useState<string>('');
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [rememberMeValue, setRememberMeValue] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    university?: string;
    username?: string;
    password?: string;
    rememberMe?: string;
  }>({});

  useEffect(() => {
    const university = searchParams.get('university');
    if (university) {
      setUniversityValue(decodeURIComponent(university));
      setIsReadOnly(true);
    }
  }, [searchParams]);

  const handleUniversityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isReadOnly) {
      setUniversityValue(e.target.value);
      if (errors.university) {
        setErrors(prev => ({ ...prev, university: undefined }));
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(e.target.value);
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMeValue(e.target.checked);
    if (errors.rememberMe) {
      setErrors(prev => ({ ...prev, rememberMe: undefined }));
    }
  };

  function handleSignIn(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newErrors: typeof errors = {};

    // Validate all fields
    if (!universityValue || universityValue.trim() === '') {
      newErrors.university = 'University is required';
    }
    if (!usernameValue || usernameValue.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (!passwordValue || passwordValue.trim() === '') {
      newErrors.password = 'Password is required';
    }
    if (!rememberMeValue) {
      newErrors.rememberMe = 'Please accept the remember me option';
    }

    // If there are errors, show warnings and don't redirect
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // All fields are complete, redirect
    router.push('/confirm/declaration');
  }

  return (
    <div className="container bg-white rounded-4xl lg:justify-start lg:items-start md:justify-center md:items-center sm:justify-center sm:items-center mx-auto px-auto py-0 my-0">
      <div className="flex flex-row justify-start items-start w-full sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start px-12 lg:mx-16 sm:mx-0 py-25 relative">
        {/* Left Section - Form */}
        <div className="flex flex-col sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start gap-4 border-4 border-secondary-border shadow-sm bg-white-light lg:px-6 py-4 sm:px-4 rounded-4xl object-contain">
          <div className="flex flex-col justify-start items-start pl-4 pr-10 mr-16 pt-4 gap-2">
            <h1 className="text-4xl font-bold text-primary-dark">
              Enter your credentials
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
          <div className="flex flex-col justify-start items-start gap-4 w-full px-4 pb-4">
            <form className="flex flex-col w-full gap-4" onSubmit={handleSignIn}>
              <Input
                id="university"
                name="university"
                label="University"
                placeholder="Choose your university"
                value={universityValue}
                onChange={handleUniversityChange}
                readOnly={isReadOnly}
                required={true}
                className={isReadOnly ? "opacity-75" : ""}
                error={errors.university}
              />
              <Input
                id="username"
                name="username"
                label="Username"
                type="text"
                placeholder="Username"
                value={usernameValue}
                onChange={handleUsernameChange}
                required={true}
                error={errors.username}
              />
              <Input
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                value={passwordValue}
                onChange={handlePasswordChange}
                required={true}
                error={errors.password}
              />

              <Checkbox
                id="rememberMe"
                name="rememberMe"
                label="Remember me"
                checked={rememberMeValue}
                onChange={handleRememberMeChange}
                required 
              />
              {errors.rememberMe && (
                <span className="text-accents-red text-sm mt-1">{errors.rememberMe}</span>
              )}
              
              <div className="flex flex-col gap-2 w-full">
                <Button type="submit" fullWidth size="lg">
                  sign in
                </Button>
                <p className="text-sm text-secondary-typography text-center w-full font-medium">
                  by signing in you accept the{" "}
                  <Link href="#" className="underline text-primary-dark">
                    terms and conditions
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="flex flex-col md-1:right-50 md-1:bottom-35 md-2:right-18 md-2:bottom-30 md-3:right-28 md-3:bottom-50 absolute">
          <div className="w-full">
            <Image
              src={withBasePath("/assets/images/login illustration.png")}
              alt="Login Illustration"
              width={350}
              height={350}
              className="object-fill sm-1:hidden md-3:block md-2:block md-1:block md-1:w-140 md-1:h-140 md-2:w-140 md-2:h-140 md-3:w-100 md-3:h-100"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="container bg-white rounded-4xl lg:justify-start lg:items-start md:justify-center md:items-center sm:justify-center sm:items-center mx-auto px-auto py-0 my-0">
        <div className="flex flex-row justify-start items-start w-full sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start px-12 lg:mx-16 sm:mx-0 py-25 relative">
          <div className="flex flex-col sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start gap-4 border-4 border-secondary-border shadow-sm bg-white-light lg:px-6 py-4 sm:px-4 rounded-4xl object-contain">
            <div className="flex flex-col justify-start items-start pl-4 pr-10 mr-16 pt-4 gap-2">
              <h1 className="text-4xl font-bold text-primary-dark">
                Enter your credentials
              </h1>
            </div>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
