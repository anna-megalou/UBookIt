import Link from "next/link";
import Image from "next/image";
import { Clock } from "tabler-icons-react";
export default function Home() {
  return (
    <div className="container bg-white rounded-4xl justify-center mx-auto px-auto">
      <div className="flex flex-col justify-center items-center w-full">
        {/* Hero Section */}
        <div className="flex flex-row justify-center items-center px-30 pt-20 w-full">
          {/* Left Content */}
          <div className="flex flex-col justify-start items-start gap-8">
            <div className="flex flex-col justify-center items-start gap-8">
              <h1 className="text-5xl font-bold text-primary-dark">
                Παρέλαβε τα πανεπιστημιακά βιβλία σου εύκολα και γρήγορα
              </h1>
              <h4 className="text-xl text-secondary-dark">
                Παράγγειλε τα βιβλία σου μόνο με ένα κλίκ
              </h4>
            </div>

            {/* Sign In Button */}
            <div className="flex justify-center items-center bg-primary-dark rounded-full px-10 py-3 w-fit">
              <Link
                href="/login"
                className="text-white text-semibold  text-md font-bold"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="flex flex-col justify-center items-center ml-60 w-full h-full">
            <img src="/assets/images/kid_with_books.png" alt="Hero Illustration" />
          </div>
        </div>
        {/* Feature Cards */}
        <div className="flex flex-row justify-center items-center px-30  sm:py-16  sm:gap-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 - Highlighted */}
            <div className="bg-primary-dark text-white px-6 py-6 rounded-3xl h-50">
              <div className="flex flex-row justify-start items-center mb-4 gap-3">
                <div className="flex items-start justify-start mr-2">
                  <Clock className="w-14 h-14"/>
                </div>
                <h3 className="text-2xl font-semibold">
                  Παρακολούθηση παραγγελίας
                </h3>
              </div>
              <p className="text-white text-sm font-semibold">
                Παρακολούθησε την παραγγελία σου σε πραγματικό χρόνο
              </p>
            </div>

            {/* Card 2 */}
            <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl h-50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-blue-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-900">
                  Επιλογή βιβλίων
                </h3>
              </div>
              <p className="text-gray-600">
                Δήλωσε τα βιβλία σου όσο γρήγορα μπορείς
              </p>
            </div>

            {/* Card 3 */}
            <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl h-50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-blue-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h4c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h4zm2 0h6V4H9v2zm-2 4h10v10H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-900">
                  Αγορά βιβλίων
                </h3>
              </div>
              <p className="text-gray-600">
                Ασφαλής πληρωμή και άμεση παράδοση στο σπίτι
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
