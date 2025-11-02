import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";

export default function LoginPage() {
  return (
    <div className="container bg-white rounded-4xl lg:justify-start lg:items-start md:justify-center md:items-center sm:justify-center sm:items-center mx-auto px-auto py-0 my-0">
      <div className="flex flex-row justify-start items-start w-full sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start px-12 lg:mx-16 sm:mx-0 py-25 relative">
        {/* Left Section - Form */}
        <div className="flex flex-col sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start gap-4 border-4 border-secondary-border shadow-sm bg-white-light lg:px-6 py-4 sm:px-4 rounded-4xl object-contain ">
          <div className="flex flex-col justify-start items-start pl-4 pr-10 mr-16 pt-4 gap-2">
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
          <div className="flex flex-col justify-start items-start gap-4 w-full px-4 pb-4">
            <form className="flex flex-col w-full gap-4">
              {/* University Label */}
              <div className="flex flex-col justify-start items-start gap-1">
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
              <div className="flex flex-col justify-start items-start gap-1">
                <label
                  htmlFor="username"
                  className="text-primary-dark text-lg font-medium"
                >
                  Username
                </label>

                {/* Input Field */}
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  className="w-full px-6 py-4 rounded-full border-2 border-secondary-typography text-secondary-dark text-lg focus:border-secondary-dark focus:outline-none not-placeholder-shown:border-secondary-dark"
                />
              </div>
              {/* Password Label */}
              <div className="flex flex-col justify-start items-start gap-1">
                <label
                  htmlFor="password"
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

              {/* Remember me checkbox */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-primary-dark border-secondary-typography rounded focus:ring-primary-dark"
                />
                <label htmlFor="remember" className="text-primary-dark text-lg">
                  Remember me
                </label>
              </div>
            </form>
            <div className="flex flex-col gap-2 w-full">
              {/* Sign In Button */}
              <div className="flex justify-center items-center bg-primary-dark rounded-full px-10 py-2 w-full h-15">
                <Link
                  href="/login/signin"
                  className="text-white text-semibold  text-md font-bold"
                >
                  sign in
                </Link>
              </div>

              {/* Terms and conditions */}
              <p className="text-sm text-secondary-typography text-center w-full font-medium">
                by signing in you accept the{" "}
                <Link href="#" className="underline text-primary-dark">
                  terms and conditions
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="flex flex-col md-1:right-40 md-1:bottom-20 md-2:right-18 md-2:bottom-20 md-3:right-28 md-3:bottom-20 absolute">
          <div className="w-full">
            <Image
              src={withBasePath("/assets/images/login illustration.png")}
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
