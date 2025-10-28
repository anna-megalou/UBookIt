import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="container bg-white rounded-4xl justify-center mx-auto px-auto">
      <div className="flex flex-col justify-center items-start w-full relative sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start">
        <div className="flex flex-row justify-center items-start px-25 pt-20 pb-14">
          <h1 className="text-4xl font-bold text-primary-dark">
            Επίλεξε τα συγγράμματα που θέλεις για αποστολή
          </h1>
        </div>
      <div className="flex flex-col justify-center items-center px-25  sm:py-16  sm:gap-15 relative ">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-10 sm:gap-15 w-full">
            {/* Card 1 - Highlighted */}
            <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-250 h-40">
              {/* Πάνω μέρος - τίτλος + χρόνος */}
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-primary-dark">Bookstore Name</h4>
                <span className="text-sm text-primary-dark">1–3 Days</span>
              </div>

              {/* Λίστα βιβλίων */}
              <div className="flex flex-col w-full space-y-4">
                {/* Book 1 */}
                <label className="flex justify-between items-center cursor-pointer">
                  {/* Αριστερά radio + τίτλος */}
                  <div className="flex items-center gap-2">
                    <input type="radio" name="selectedBook" className="w-5 h-5 accent-primary-dark"/>
                    <span className="text-primary-dark text-sm">Book title</span>
                  </div>
                  {/* Δεξιά badges + τιμή */}
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full"> Available </span>
                    <span className="text-primary-dark font-semibold text-lg">2 €</span>
                  </div>
                </label>

    {/* Book 2 */}
    <label className="flex justify-between items-center cursor-pointer">
      {/* Αριστερά radio + τίτλος */}
      <div className="flex items-center gap-2">
        <input
          type="radio"
          name="selectedBook"
          className="w-5 h-5 accent-primary-dark"
        />
        <span className="text-primary-dark text-sm">Book title</span>
      </div>
      {/* Δεξιά badges + τιμή */}
      <div className="flex items-center gap-2">
        <span className="bg-red-400 text-white text-xs px-2 py-1 rounded-full">
          Unavailable
        </span>
        <span className="text-primary-dark font-semibold text-lg">7 €</span>
      </div>
    </label>
  </div>
</div>



            {/* Card 2 */}
            <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-250 h-30 relative">
              <div className="flex flex-row justify-start items-center mb-4 gap-3">
                <h3 className="text-2xl font-semibold text-primary-dark">
                  Επιλογή βιβλίων
                </h3>
              </div>
              <p className="text-secondary-dark text-sm font-semibold">
                Δήλωσε τα βιβλία σου όσο γρήγορα μπορείς
              </p>
            </div>

            {/* Card 3 */}
            {/* Right Content - Illustration */}
            <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-250 h-30 relative">
              <div className="flex flex-row justify-start items-center mb-4 gap-3">
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