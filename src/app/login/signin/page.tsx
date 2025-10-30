import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="container bg-white rounded-4xl lg:justify-start lg:items-start md:justify-center md:items-center sm:justify-center sm:items-center mx-auto px-auto py-0 my-0">
      <div className="flex flex-row justify-start items-start w-full sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start px-12 lg:mx-16 sm:mx-0 py-35 relative">
        {/* Left Section - Form */}
        <div className="flex flex-col sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start gap-8 border-4 border-secondary-border shadow-sm bg-white-light lg:px-8 py-6 sm:px-4 rounded-4xl object-contain ">
          <div className="flex flex-col justify-start items-start pl-4 pr-10 mr-16 pt-10 gap-2">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-primary-dark">
              Enter your credentials
            </h1>
            {/* Sign in link */}
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
          <div className="flex flex-col justify-start items-start gap-4 w-full px-4 pb-4 gap-10">
            <form className="flex flex-col w-full gap-4">
              {/* University Label */}
              <div className="flex flex-col justify-start items-start gap-2">
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
                  className="w-full px-6 py-4 rounded-full border-2 border-secondary-typography text-secondary-dark text-lg focus:border-secondary-dark focus:outline-none not-placeholder-shown:border-secondary-dark"
                />
              </div>
              {/* Username Label */}
              <div className="flex flex-col justify-start items-start gap-2">
                <label
                  htmlFor="university"
                  className="text-primary-dark text-lg font-medium"
                >
                  Username
                </label>

                {/* Input Field */}
                <input
                  id="university"
                  type="text"
                  placeholder="Username"
                  className="w-full px-6 py-4 rounded-full border-2 border-secondary-typography text-secondary-dark text-lg focus:border-secondary-dark focus:outline-none not-placeholder-shown:border-secondary-dark"
                />
              </div>
              {/* Password Label */}
              <div className="flex flex-col justify-start items-start gap-2">
                <label
                  htmlFor="university"
                  className="text-primary-dark text-lg font-medium"
                >
                  Password
                </label>

                {/* Input Field */}
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-6 py-4 rounded-full border-2 border-secondary-typography text-secondary-dark text-lg focus:border-secondary-dark focus:outline-none not-placeholder-shown:border-secondary-dark"
                />
              </div>
            </form>
            {/* Continue Button */}
            <div className="flex justify-center items-center bg-primary-dark rounded-full px-10 py-4 w-full h-15">
              <Link
                href="/login/signin"
                className="text-white text-semibold  text-md font-bold"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="flex flex-col md-1:right-40 md-1:bottom-30 md-2:right-18 md-2:bottom-30 md-3:right-28 md-3:bottom-40 absolute">
          <div className="w-full">
            <Image
              src="/assets/images/login illustration.png"
              alt="Login Illustration"
              width={350}
              height={350}
              className="object-fill sm-1:hidden md-3:block md-2:block md-1:block md-1:w-150 md-1:h-160 md-2:w-140 md-2:h-150 md-3:w-100 md-3:h-100"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
