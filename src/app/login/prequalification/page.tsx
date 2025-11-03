import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import Select from "@/components/ui/Select";

export default function LoginPage() {
  return (
    <div className="container bg-white rounded-4xl lg:justify-start lg:items-start md:justify-center md:items-center sm:justify-center sm:items-center mx-auto px-auto">
      <div className="flex flex-row justify-start items-start w-full sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start px-12 lg:mx-16 sm:mx-0 py-35 relative">
        {/* Left Section - Form */}
        <div className="flex flex-col sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start gap-8 border-4 border-secondary-border shadow-sm bg-white-light lg:px-8 py-6 sm:px-4 rounded-4xl object-contain ">
          <div className="flex flex-col justify-start items-start pl-4 pr-10 mr-16 pt-5 gap-2">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-primary-dark">
              Where are you studying?
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
          <div className="flex flex-col justify-start items-start gap-2 w-full px-4 pb-4 gap-6">
            <form className="flex flex-col w-full gap-1">
              {/* University Label */}
              <label
                htmlFor="university"
                className="text-primary-dark text-lg font-medium"
              >
                University
              </label>

              {/* Custom Dropdown Field */}
              <Select
                id="university"
                required
                placeholder="Choose your university"
                options={[
                  { value: "", label: "Choose your university" },
                  {
                    value: "athens",
                    label: "Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών",
                  },
                  {
                    value: "aristotle",
                    label: "Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης",
                  },
                  { value: "patras", label: "Πανεπιστήμιο Πατρών" },
                  { value: "crete", label: "Πανεπιστήμιο Κρήτης" },
                  { value: "ioannina", label: "Πανεπιστήμιο Ιωαννίνων" },
                  { value: "thessaly", label: "Πανεπιστήμιο Θεσσαλίας" },
                  { value: "macedonia", label: "Πανεπιστήμιο Μακεδονίας" },
                  { value: "aegean", label: "Πανεπιστήμιο Αιγαίου" },
                  { value: "piraeus", label: "Πανεπιστήμιο Πειραιώς" },
                  {
                    value: "athens-economics",
                    label: "Οικονομικό Πανεπιστήμιο Αθηνών",
                  },
                  { value: "other", label: "Άλλο" },
                ]}
              />
            </form>
            {/* Continue Button */}
            <div className="flex justify-center items-center bg-primary-dark rounded-full px-10 py-2 w-full h-15">
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
        <div className="flex flex-col md-1:right-40 md-1:bottom-26 md-2:right-18 md-2:bottom-26 md-3:right-28 md-3:bottom-30 absolute">
          <div className="w-full">
            <Image
              src={withBasePath("/assets/images/login illustration.png")}
              alt="Login Illustration"
              width={350}
              height={350}
              className="object-fill sm-1:hidden md-3:block md-2:block md-1:block md-1:w-130 md-1:h-130 md-2:w-110 md-2:h-110 md-3:w-100 md-3:h-100"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
