import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="container bg-white rounded-4xl lg:justify-start lg:items-start md:justify-center md:items-center sm:justify-center sm:items-center mx-auto px-auto">
      <div className="flex flex-row justify-start items-start w-full sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start px-12 lg:mx-16 sm:mx-0 py-35 relative">
        {/* Left Section - Form */}
        <div className="flex flex-col sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start gap-8 border-4 border-secondary-border shadow-sm bg-white-light lg:px-8 py-6 sm:px-4 rounded-4xl object-contain">
          <div className="flex flex-col justify-start items-start pl-4 pr-10 mr-16 pt-5 gap-2">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-primary-dark">
              Where are you studying?
            </h1>
            {/* Sign in link */}
            <p className="text-lg text-primary-dark">
              Already a member?{" "}
              <Link href="/login" className="text-primary-dark font-semibold">
                Sign in now!
              </Link>
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-start items-start gap-2 w-full px-4 pb-4 gap-6">
            <form className="flex flex-col w-full gap-1">
              {/* University Label */}
              <label
                htmlFor="university"
                className="text-primary-dark text-lg font-medium"
              >
                University
              </label>

              {/* Input Field */}
              <input
                id="university"
                type="text"
                placeholder="Choose your university"
                className="w-full px-6 py-4 rounded-full border-2 border-secondary-typography text-primary-dark text-lg"
              />
            </form>
            {/* Continue Button */}
            <div className="flex justify-center items-center bg-primary-dark rounded-full px-10 py-2 w-full h-15">
              <Link
                href="/login"
                className="text-white text-semibold  text-md font-bold"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="flex flex-col justify-end lg:right-40 lg:bottom-8  md:right-0 sm:right-0 md:bottom-0 relative">
          <div className="w-full">
            <Image
              src="/assets/images/login illustration.png"
              alt="Login Illustration"
              width={320}
              height={320}
              className="object-fill md:w-60 md:h-60 lg:w-80 lg:h-80 sm:hidden md:hidden lg:block"
              priority 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
