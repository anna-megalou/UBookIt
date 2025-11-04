import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container bg-white rounded-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-center lg:justify-start items-start px-4 pt-7 pb-15">
        <h1 className="text-4xl font-bold text-primary-dark">
          Επίλεξε τα συγγράμματα που θέλεις να σου αποσταλούν
        </h1>
      </div>

      {/* Flex container για δύο στήλες */}
      <div className="flex gap-10">
        
        {/* Αριστερή στήλη: Cards */}
        <div className="flex-1 grid auto-rows-auto gap-y-5 pb-20">
          {/* Card 1 */}
          <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-semibold text-primary-dark">Broken Hill Publishers</h4>
              <span className="text-md text-gray-500">2-4 Days</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4">
              <div className="flex flex-col gap-2 col-span-2">
                <label className="flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <input type="checkbox" name="card1Books" className="w-5 h-5 accent-primary-dark"/>
                    <span className="text-primary-dark text-lg">Διαφορικός και Ολοκληρωτικός Λογισμός - Θεωρία και Εφαρμογές</span>
                  </div>
                  <span className="bg-green-500 text-white text-md px-7 py-2 rounded-full">Available</span>
                </label>
                <label className="flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <input type="checkbox" name="card1Books" className="w-5 h-5 accent-primary-dark"/>
                    <span className="text-primary-dark text-lg">Εισαγωγή στο Management</span>
                  </div>
                  <span className="bg-red-400 text-white text-md px-5 py-2 rounded-full">Unavailable</span>
                </label>
              </div>
              <div className="flex items-start justify-center">
                <span className="text-primary-dark font-semibold text-lg">2 €</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-semibold text-primary-dark">Βιβλιοδιανομή Οικονομικού Πανεπιστημίου Αθηνών</h4>
              <span className="text-sm text-gray-500">1-3 Days</span>
            </div>
            <label className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <input type="checkbox" name="card2Book" className="w-5 h-5 accent-primary-dark" />
                <span className="text-primary-dark text-lg">Αρχές Λειτουργίας και Προγραμματισμού Η/Υ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white text-md px-7 py-2 rounded-full">Available</span>
                <span className="text-primary-dark font-semibold text-lg">1,5 €</span>
              </div>
            </label>
          </div>

          {/* Card 3 */}
          <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full">
            <div className="flex justify-between items-start mb-5">
              <h4 className="text-xl font-semibold text-primary-dark">Εκδόσεις Σταμούλη</h4>
              <span className="text-sm text-gray-500">2-4 Days</span>
            </div>
            <label className="flex justify-between items-center">
              <div className="flex items-center gap-5 mb-3">
                <input type="checkbox" name="card3Book" className="w-5 h-5 accent-primary-dark" />
                <span className="text-primary-dark text-lg">Εισαγωγή στο Μάρκετινγκ</span>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <span className="bg-red-400 text-white text-md px-5 py-2 rounded-full">Unavailable</span>
              </div>
            </label> 
            <div className="container bg-primary-light rounded-3xl mx-auto px-4 py-7">
              <div className="flex items-center gap-3">
                <span className="text-yellow-500 text-2xl">⚠️</span>
                <p className="text-primary-dark text-base m-0">You won't receive the books that are not available for delivery. Consider placing your order once all the books are available in the bookstore.</p>
                <button className="bg-primary-dark text-white px-7 py-2 rounded-3xl font-semibold hover:bg-secondary-light transition-colors whitespace-nowrap">Notify Me</button>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-semibold text-primary-dark">ΜΠΕΝΟΥ & ΣΙΑ Ε.Ε.</h4>
              <span className="text-sm text-gray-500">1–3 Days</span>
            </div>
            <label className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <input type="checkbox" name="card4Book" className="w-5 h-5 accent-primary-dark"/>
                <span className="text-primary-dark text-lg">Λογιστική: Χρηματοοικονομικές Αναφορές σύμφωνα με τα Ελληνικά και τα Διεθνή Λογιστικά Πρότυπα</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white text-md px-7 py-2 rounded-full">Available</span>
                <span className="text-primary-dark font-semibold text-lg">1,5 €</span>
              </div>
            </label>
          </div>
        </div>

        {/* Δεξιά στήλη: Summary */}
        <div className="w-75 sticky top-6 self-start border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl">
          <h3 className="text-lg font-bold text-primary-dark mb-4">Summary</h3>
          <div className="flex items-center text-gray-600 mb-6">
            <p className="mr-47">Total</p>
            <span className="text-primary-dark font-semibold">7 €</span>
          </div>
          <div className="flex items-center text-gray-600 mb-6">
            <p className="mr-28.5">Books selected</p>
            <span className="text-primary-dark font-semibold">4</span>
          </div>
          <div className="flex items-center text-gray-600 mb-6">
            <p className="mr-44">Stores</p>
            <span className="text-primary-dark font-semibold">3</span>
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-primary-dark text-white py-2 px-10 rounded-3xl font-semibold">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
