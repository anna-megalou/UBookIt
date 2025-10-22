import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-auto py-auto bg-white rounded-[30px]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 leading-tight">
                Παρέλαβε τα πανεπιστημιακά βιβλία σου εύκολα και γρήγορα
              </h1>
              <p className="text-xl text-blue-900">
                Παράγγειλε τα βιβλία σου μόνο με ένα κλίκ
              </p>
            </div>
            
            <div className="pt-4">
              <Link
                href="/university"
                className="inline-block bg-blue-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-800 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              {/* Student Illustration Placeholder */}
              <div className="text-center">
                <div className="w-32 h-32 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍🎓</span>
                </div>
                <div className="space-y-2">
                  <div className="w-16 h-4 bg-blue-600 rounded mx-auto"></div>
                  <div className="w-12 h-4 bg-blue-600 rounded mx-auto"></div>
                  <div className="w-14 h-4 bg-blue-600 rounded mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Highlighted */}
          <div className="bg-blue-900 text-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Παρακολούθηση παραγγελίας</h3>
            </div>
            <p className="text-blue-100">
              Παρακολούθησε την παραγγελία σου σε πραγματικό χρόνο
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900">Επιλογή βιβλίων</h3>
            </div>
            <p className="text-gray-600">
              Δήλωσε τα βιβλία σου όσο γρήγορα μπορείς
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h4c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h4zm2 0h6V4H9v2zm-2 4h10v10H7V8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900">Αγορά βιβλίων</h3>
            </div>
            <p className="text-gray-600">
              Ασφαλής πληρωμή και άμεση παράδοση στο σπίτι
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
