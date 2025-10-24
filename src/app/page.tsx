import Link from "next/link";
import Image from "next/image";
import { Clock, ShoppingCart } from "tabler-icons-react";
import { BookOpen, CreditCard } from "lucide-react";
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
              <div className="flex flex-row justify-start items-center mb-4 gap-3">
                <div className="flex items-start justify-start mr-2">
                  <BookOpen className="w-14 h-14 text-primary-dark" />
                </div>
                <h3 className="text-2xl font-semibold text-primary-dark">
                  Επιλογή βιβλίων
                </h3>
              </div>
              <p className="text-secondary-dark text-sm font-semibold">
                Δήλωσε τα βιβλία σου όσο γρήγορα μπορείς
              </p>
            </div>

            {/* Card 3 */}
            <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl h-50">
              <div className="flex flex-row justify-start items-center mb-4 gap-3">
                <div className="flex items-start justify-start mr-2">
                  <CreditCard className="w-14 h-14 text-primary-dark" />
                </div>
                <h3 className="text-2xl font-semibold text-primary-dark">
                  Αγορά βιβλίων
                </h3>
              </div>
              <p className="text-secondary-dark text-sm font-semibold">
                Ασφαλής πληρωμή και άμεση παράδοση στο σπίτι
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
