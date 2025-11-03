import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="container bg-white rounded-4xl justify-center mx-auto px-auto">
      <div className="flex flex-col justify-center items-start w-full relative sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start">
        <div className="flex flex-row justify-center items-start px-25 pt-20 pb-14">
          <h1 className="text-4xl font-bold text-primary-dark"> Επίλεξε τα συγγράμματα που θέλεις να σου αποσταλούν </h1>
        </div>
      <div className="flex flex-col justify-center items-center px-25 sm:py-4 sm:gap-6 relative">
          <div className="grid grid-cols-[5fr_1.5fr] grid-rows-4 gap-10 w-full">
            {/* Card 1 - Highlighted */}
            <div className="col-start-1 row-start-1 border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full">
              {/* Πάνω μέρος - τίτλος + χρόνος */}
              <div className="flex justify-between items-start mb-7">
                <h4 className="text-xl font-semibold text-primary-dark"> Broken Hill Publishers </h4>
                <span className="text-md text-gray-500"> 2-4 Days </span>
              </div>

              {/* 3-στήλες layout */}
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4">
                {/* Λίστα βιβλίων (1η & 2η στήλη) */}
                <div className="flex flex-col gap-8 col-span-2">
                  {/* Book 1 */}
                  <label className="flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="publisherBooks" className="w-5 h-5 accent-primary-dark"/>
                      <span className="text-primary-dark text-base"> Διαφορικός και Ολοκληρωτικός Λογισμός - Θεωρία και Εφαρμογές </span>
                    </div>
                    <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full"> Available </span>
                  </label>

                  {/* Book 2 */}
                  <label className="flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="publisherBooks" className="w-5 h-5 accent-primary-dark"/>
                        <span className="text-primary-dark text-base">Εισαγωγή στο Management</span>
                    </div>
                      <span className="bg-red-400 text-white text-sm px-3 py-1 rounded-full"> Unavailable </span>
                  </label>
                </div>
                <div className="flex items-center justify-center h-full">
                  <span className="text-primary-dark font-semibold text-lg">2 €</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-start-1 row-start-2 border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full">
              {/* Πάνω μέρος - τίτλος + χρόνος */}
              <div className="flex justify-between items-start mb-7">
                <h4 className="text-xl font-semibold text-primary-dark"> Βιβλιοδιανομή Οικονομικού Πανεπιστημίου Αθηνών </h4>
                <span className="text-sm text-gray-500"> 1-3 Days </span>
              </div>

              {/* Book 1 */}
              <label className="flex justify-between items-center cursor-pointer mt-13">
                {/* Αριστερά radio + τίτλος */}
                <div className="flex items-center gap-2">
                  <input type="radio" name="card2Book1" className="w-5 h-5 accent-primary-dark" />
                  <span className="text-primary-dark text-md"> Αρχές Λειτουργίας και Προγραμματισμού Η/Υ </span>
                </div>
                {/* Δεξιά badges + τιμή */}
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full"> Available </span>
                  <span className="text-primary-dark font-semibold text-lg"> 1,5 € </span>
                </div>
              </label>
            </div>

            {/* Card 3 */}
            <div className="col-start-1 row-start-3 border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full">
              {/* Πάνω μέρος - τίτλος + χρόνος */}
              <div className="flex justify-between items-start mb-7">
                <h4 className="text-xl font-semibold text-primary-dark"> Εκδόσεις Σταμούλη </h4>
                <span className="text-sm text-gray-500"> 2-4 Days </span>
              </div>

              {/* Book 1 */}
              <label className="flex justify-between items-center cursor-pointer mt-13">
                {/* Αριστερά radio + τίτλος */}
                <div className="flex items-center gap-2">
                  <input type="radio" name="card3Book1" className="w-5 h-5 accent-primary-dark" />
                  <span className="text-primary-dark text-md"> Εισαγωγή στο Μάρκετινγκ </span>
                </div>
                {/* Δεξιά badges + τιμή */}
                <div className="flex items-center gap-2">
                  <span className="bg-red-400 text-white text-sm px-3 py-1 rounded-full"> Unavailable </span>
                </div>
              </label>
            </div>

            {/* Card 4 */}
            <div className="col-start-1 row-start-4 border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full">
              {/* Πάνω μέρος - τίτλος + χρόνος */}
              <div className="flex justify-between items-start mb-7">
                <h4 className="text-xl font-semibold text-primary-dark"> ΜΠΕΝΟΥ & ΣΙΑ Ε.Ε. </h4>
                <span className="text-sm text-gray-500"> 1–3 Days </span>
              </div>

              {/* Book 1 */}
              <label className="flex justify-between items-center cursor-pointer mt-13">
                {/* Αριστερά radio + τίτλος */}
                <div className="flex items-center gap-2">
                  <input type="radio" name="card4Book1" className="w-5 h-5 accent-primary-dark"/>
                  <span className="text-primary-dark text-md"> Λογιστική: Χρηματοοικονομικές Αναφορές σύμφωνα με τα Ελληνικά και τα Διεθνή Λογιστικά Πρότυπα </span>
                </div>
                {/* Δεξιά badges + τιμή */}
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full"> Available </span>
                  <span className="text-primary-dark font-semibold text-lg"> 1,5 € </span>
                </div>
              </label>
            </div>

            <div className="col-start-2 row-start-1 border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl self-start row-span-full">
              <div>
                <h3 className="text-lg font-bold text-primary-dark mb-4"> Summary </h3>
                <div className="flex items-center text-gray-600 mb-6">
                  <p className="mr-43"> Total </p>
                  <span className="text-primary-dark font-semibold"> 7 € </span>
                </div>
                <div className="flex items-center text-gray-600 mb-6">
                  <p className="mr-24"> Books selected </p>
                  <span className="text-primary-dark font-semibold"> 4 </span>
                </div>
                <div className="flex items-center text-gray-600 mb-6">
                  <p className="mr-40"> Stores </p>
                  <span className="text-primary-dark font-semibold"> 3 </span>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button className="bg-primary-dark text-white py-2 px-10 rounded-3xl font-semibold"> Continue </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}