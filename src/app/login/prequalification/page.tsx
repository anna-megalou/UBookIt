import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import { universities } from "@/lib/constants";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function LoginPage() {
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
                placeholder="Choose your university"
                options={universities}
              />
            </form>
            <Button href="/login/signin" fullWidth size="md">
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
