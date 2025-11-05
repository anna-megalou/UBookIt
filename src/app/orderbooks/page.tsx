import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container bg-white rounded-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-center lg:justify-start items-start px-4 pt-7 pb-10">
        <h1 className="text-4xl font-bold text-primary-dark">
          Συμπλήρωσε τα στοιχεία αποστολής για την παραγγελία σου
        </h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 px-15 pb-10">
        {/* Left side - Form */}
        <div className="flex flex-col gap-8 flex-1">
          {/* Personal details */}
          <div className="border-3 border-secondary-border shadow-sm bg-white-light rounded-3xl p-8 w-full">
            <h2 className="text-2xl font-semibold text-primary-dark mb-6">
              Personal details
            </h2>

            {/* Row 1 */}
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex items-center gap-2 flex-1">
                <label className="w-20 text-mg font-semibold text-primary-dark">AM</label>
                <input type="text" placeholder="academic id" className="border border-gray-300 rounded-full px-4 py-2 w-full"/>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <label className="w-24 text-md font-semibold text-primary-dark">Identity</label>
                <input type="text" placeholder="identity id" className="border border-gray-300 rounded-full px-4 py-2 w-full"/>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex items-center gap-2 flex-1">
                <label className="w-20 text-md font-semibold text-primary-dark">Name</label>
                <input type="text"placeholder="name" className="border border-gray-300 rounded-full px-4 py-2 w-full"/>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <label className="w-24 text-md font-semibold text-primary-dark">Surname</label>
                <input type="text" placeholder="surname" className="border border-gray-300 rounded-full px-4 py-2 w-full"/>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex items-center gap-2 flex-1">
                <label className="w-20 text-md font-semibold text-primary-dark">Email</label>
                <input type="email" placeholder="your email" className="border border-gray-300 rounded-full px-4 py-2 w-full"/>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 flex-1">
                <label className="w-20 text-md font-semibold text-primary-dark">Phone</label>
                <input type="tel" placeholder="your phone" className="border border-gray-300 rounded-full px-4 py-2 w-full"/>
              </div>
            </div>
          </div>

          {/* Location details */}
          <div className="border-3 border-secondary-border shadow-sm bg-white-light rounded-3xl p-9 w-full">
            <h2 className="text-2xl font-semibold text-primary-dark mb-6">
              Location details
            </h2>

            {/* Row 1 */}
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex items-center gap-2 flex-1">
                <label className="w-20 text-md font-semibold text-primary-dark">City</label>
                <input type="text" placeholder="city" className="border border-gray-300 rounded-full px-4 py-2 w-full"/>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <label className="w-24 text-md font-semibold text-primary-dark">Prefecture</label>
                <input type="text" placeholder="prefecture" className="border border-gray-300 rounded-full px-4 py-2 w-full"/>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 flex-1">
                <label className="w-20 text-md font-semibold text-primary-dark">Street</label>
                <input type="text" placeholder="street name" className="border border-gray-300 rounded-full px-4 py-2 w-full"/>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <label className="w-24 text-md font-semibold text-primary-dark">Street id</label>
                <input type="text" placeholder="street id" className="border border-gray-300 rounded-full px-4 py-2 w-full"/>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Image + Payment summary */}
        <div className="flex flex-col items-center w-full lg:w-1/3">
          <Image
            src="/assets/images/kid_with_card.png"
            alt="Kid with card"
            width={320}
            height={320}
            className="object-fill w-60 h-60 sm-min:w-72 sm-min:h-72 xl-custom:w-80 xl-custom:h-80 sm:hidden lg:block"
              style={{ width: 'auto', height: 'auto' }}
          />

          <div className="border-3 border-secondary-border shadow-sm bg-white-light rounded-3xl p-6 w-full bg-white">
            <h3 className="text-xl font-bold text-primary-dark mb-4">
              Proceed your payment
            </h3>

            <div className="flex justify-between mb-3">
              <p className="text-gray-700 text-lg">Total amount</p>
              <span className="text-gray-700 font-semibold text-lg">5€</span>
            </div>

            <ul className="text-gray-600 mb-6 text-md">
              <li><strong>•</strong> Broken Hill Publishers — 2€</li>
              <li><strong>•</strong> Βιβλιοδιανομή Ο.Π.Α. — 1,5€</li>
              <li><strong>•</strong> ΜΠΕΝΟΥ & ΣΙΑ Ε.Ε. — 1,5€</li>
            </ul>

            <div className="flex justify-center">
                <Link href="/nextpage" className="bg-primary-dark text-white text-center font-semibold py-2 px-10 rounded-3xl">
                    Continue <strong>→</strong>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
