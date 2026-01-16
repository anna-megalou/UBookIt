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
  const [universityId, setUniversityId] = useState<string>('');
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [rememberMeValue, setRememberMeValue] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    university?: string;
    username?: string;
    password?: string;
    rememberMe?: string;
  }>({});

  useEffect(() => {
    const university = searchParams.get('university');
    const universityIdParam = searchParams.get('universityId');
    if (university) {
      const decodedUniversity = decodeURIComponent(university);
      setUniversityValue(decodedUniversity);
      setIsReadOnly(true);
    }
    if (universityIdParam) {
      setUniversityId(decodeURIComponent(universityIdParam));
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

  // Map university label to universityId
  const getUniversityId = (universityLabel: string): string => {
    // Map common university labels to IDs
    const lowerLabel = universityLabel.toLowerCase();
    if (lowerLabel.includes('οικονομικό') || lowerLabel.includes('economics')) {
      return 'aueb';
    }
    
    // If no match found, use the label as-is (assuming it might already be an ID)
    // or return a sanitized version
    return universityLabel.toLowerCase().replace(/\s+/g, '');
  };

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const newErrors: typeof errors = {};
    setApiError(null);

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

    // If there are errors, show warnings and don't proceed
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Start authentication
    setIsLoading(true);
    try {
      // Use universityId from query param if available, otherwise map from label
      const id = universityId || getUniversityId(universityValue);
      
      const response = await fetch(
        'https://ubookit-ja0e.onrender.com/user/me',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: usernameValue,
            password: passwordValue,
            universityId: id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.code !== 0) {
        // Handle error response
        const errorMessage = data.message || data.description || 'Authentication failed. Please check your credentials.';
        setApiError(errorMessage);
        setIsLoading(false);
        return;
      }

      // Authentication successful
      // Extract userId from response
      const userId = data.user?.userId || data.userId || data.user?.id;
      const userName = data.user?.userName || data.userName || usernameValue.trim();

      console.log('Authentication response:', data);
      console.log('Extracted userId:', userId);
      console.log('Extracted userName:', userName);

      // Validate that userId exists
      if (!userId) {
        console.error('UserId not found in response:', data);
        setApiError('User ID not found in response. Please try again.');
        setIsLoading(false);
        return;
      }

      // Store authentication state if "remember me" is checked
      if (rememberMeValue) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', userName);
        localStorage.setItem('userId', String(userId));
        localStorage.setItem('universityId', id);
        console.log('Stored userId to localStorage:', userId);
      } else {
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('username', userName);
        sessionStorage.setItem('userId', String(userId));
        sessionStorage.setItem('universityId', id);
        console.log('Stored userId to sessionStorage:', userId);
      }

      // Redirect to confirmation page
      router.push('/confirm/declaration');
    } catch (error) {
      console.error('Authentication error:', error);
      setApiError('An error occurred during authentication. Please try again.');
      setIsLoading(false);
    }
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
              
              {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                  {apiError}
                </div>
              )}
              
              <div className="flex flex-col gap-2 w-full">
                <Button type="submit" fullWidth size="lg" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'sign in'}
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
