import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="container bg-white rounded-4xl justify-center mx-auto px-auto">
      <div className="flex flex-col justify-center items-start w-full relative sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start">
        <div className="flex flex-row justify-center items-start px-25 pt-20 pb-14">
          <h1 className="text-4xl font-bold text-primary-dark"> Επιβεβαίωσε τα συγγράμματα που έχεις δηλώσει στον Εύδοξο </h1>
        </div>
      <div className="flex flex-col justify-center items-center px-25 sm:py-4 sm:gap-6 w-full relative">
        <div className="grid grid-cols-[4.5fr_1.5fr] grid-rows-6 gap-10 w-full">
            {/* Card 1 */}
            <div className="col-start-1 row-start-1 border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl">
                <h4 className="text-lg font-semibold text-primary-dark">Μαθηματικά I (1ο Εξάμηνο)</h4>
                <p>Διαφορικός και Ολοκληρωτικός Λογισμός - Θεωρία και Εφαρμογές | Broken Hill Publishers</p>
            </div>

            {/* Card 2 */}
            <div className="col-start-1 row-start-2 border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl">
                <h4 className="text-lg font-semibold text-primary-dark">Λογιστική I (1ο Εξάμηνο)</h4>
                <p>Λογιστική: Χρηματοοικονομικές Αναφορές σύμφωνα με τα Ελληνικά και τα Διεθνή Λογιστικά Πρότυπα | ΜΠΕΝΟΥ & ΣΙΑ Ε.Ε.</p>
            </div>

            {/* Card 3 */}
            <div className="col-start-1 row-start-3 border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl">
                <h4 className="text-lg font-semibold text-primary-dark">Εισαγωγή στην Πληροφορική (1ο Εξάμηνο)</h4>
                <p>Αρχές Λειτουργίας και Προγραμματισμού Η/Υ | Βιβλιοδιανομή Οικονομικού Πανεπιστημίου Αθηνών</p>
            </div>

            {/* Card 4 */}
            <div className="col-start-1 row-start-4 border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl">
                <h4 className="text-lg font-semibold text-primary-dark">Εισαγωγή στην Διοίκηση Επιχειρήσεων (1ο Εξάμηνο)</h4>
                <p>Εισαγωγή στο Management | Broken Hill Publishers</p>
            </div>

            {/* Card 5 */}
            <div className="col-start-1 row-start-5 border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl">
                <h4 className="text-lg font-semibold text-primary-dark">Εισαγωγή στο Μάρκετινγκ (1ο Εξάμηνο)</h4>
                <p>Εισαγωγή στο Μάρκετινγκ | Εκδόσεις Σταμούλη</p>
            </div>

            {/* Card 6 */}
            <div className="col-start-1 row-start-6 justify-self-center mt-4">
                <Link href="/selectbooks" className="bg-primary-dark text-white font-bold text-lg rounded-full px-15 py-4 hover:bg-secondary-light transition-colors whitespace-nowrap">
                    Continue
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}