"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReceiptText } from "lucide-react";

export default function Home() {
  const router = useRouter();
  interface Book {
    id: number;
    name: string;
    price: number;
    store: string;
    available: boolean;
  }

  // example list of books — replace with real data or fetch from an API
  const books = [
    { id: 1, name: "Διαφορικός και Ολοκληρωτικός Λογισμός - Θεωρία και Εφαρμογές", store: "Broken Hill Publishers", available: true, price: 2 },
    { id: 2, name: "Εισαγωγή στο Management", store: "Broken Hill Publishers", available: false, price: 2 },
    { id: 3, name: "Αρχές Λειτουργίας και Προγραμματισμού Η/Υ", store: "Βιβλιοδιανομή Οικονομικού Πανεπιστημίου Αθηνών", available: true, price: 1.5 },
    { id: 4, name: "Εισαγωγή στο Μάρκετινγκ", store: "Εκδόσεις Σταμούλη", available: false, price: 0 },
    { id: 5, name: "Λογιστική: Χρηματοοικονομικές Αναφορές σύμφωνα με τα Ελληνικά και τα Διεθνή Λογιστικά Πρότυπα", store: "ΜΠΕΝΟΥ & ΣΙΑ Ε.Ε.", available: true, price: 1.5 },
  ];


  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  // Λίστα βιβλίων
  const toggleBook = (book: Book) => {
    if (selectedBooks.some(b => b.id === book.id)) {
      setSelectedBooks(selectedBooks.filter(b => b.id !== book.id));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const totalPrice = selectedBooks.reduce((sum, book) => sum + book.price, 0);
  const uniqueStores = [...new Set(selectedBooks.map(b => b.store))];

  const handleContinue = async () => {
    const response = await fetch("http://ism.dmst.aueb.gr/ismgroup17/setInitalAmount.jsp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ books: selectedBooks, totalPrice, stores: uniqueStores }),
      credentials: 'include',
    });
    if (response.ok) {
      router.push("http://ism.dmst.aueb.gr/ismgroup17/orderbooks.jsp"); 
  } else {
      console.error("Failed to submit order.");
  }
  };

  return (
    <div className="container bg-white rounded-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-center lg:justify-start items-start px-16 pt-7 pb-15">
        <h1 className="text-4xl font-bold text-primary-dark">
          Επίλεξε τα συγγράμματα που θέλεις να σου αποσταλούν
        </h1>
      </div>

      {/* Flex container για δύο στήλες */}
      <div className="flex gap-10 px-16">
        
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
                {books.filter(b => b.store === "Broken Hill Publishers").map(book => (
                  <label key={book.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                      <input
                        type="checkbox"
                        checked={selectedBooks.some(b => b.id === book.id)}
                        disabled={!book.available}
                        onChange={() => toggleBook(book)}
                        className="w-5 h-5 accent-primary-dark"
                      />
                      <span className="text-primary-dark font-medium text-lg">{book.name}</span>
                    </div>
                    <span className={`text-white font-medium text-md px-7 py-2 rounded-full ${book.available ? "bg-green-500" : "bg-red-400"}`}>
                      {book.available ? "Available" : "Unavailable"}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex items-start justify-center">
                <span className="text-primary-dark font-semibold text-xl">2 €</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-semibold text-primary-dark">Βιβλιοδιανομή Οικονομικού Πανεπιστημίου Αθηνών</h4>
              <span className="text-sm text-gray-500">1-3 Days</span>
            </div>
            {books.filter(b => b.store === "Βιβλιοδιανομή Οικονομικού Πανεπιστημίου Αθηνών").map(book => (
              <label key={book.id} className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    checked={selectedBooks.some(b => b.id === book.id)}
                    disabled={!book.available}
                    onChange={() => toggleBook(book)}
                    className="w-5 h-5 accent-primary-dark"
                  />
                  <span className="text-primary-dark font-medium text-lg">{book.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-white font-medium text-md px-7 py-2 rounded-full ${book.available ? "bg-green-500" : "bg-red-400"}`}>
                    {book.available ? "Available" : "Unavailable"}
                  </span>
                  <span className="text-primary-dark font-semibold text-xl">{book.price} €</span>
                </div>
              </label>
            ))}
          </div>

          {/* Card 3 */}
          <div className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full">
            <div className="flex justify-between items-start mb-5">
              <h4 className="text-xl font-semibold text-primary-dark">Εκδόσεις Σταμούλη</h4>
              <span className="text-sm text-gray-500">2-4 Days</span>
            </div>
            {books.filter(b => b.store === "Εκδόσεις Σταμούλη").map(book => (
              <label key={book.id} className="flex justify-between items-center">
                <div className="flex items-center gap-5 mb-3">
                  <input
                    type="checkbox"
                    checked={selectedBooks.some(b => b.id === book.id)}
                    disabled={!book.available}
                    onChange={() => toggleBook(book)}
                    className="w-5 h-5 accent-primary-dark"
                  />
                  <span className="text-primary-dark font-medium text-lg">{book.name}</span>
                </div>
                <div className="flex items-center gap-2 mb-5">
                  <span className={`text-white font-medium text-md px-7 py-2 rounded-full ${book.available ? "bg-green-500" : "bg-red-400"}`}>
                    {book.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </label>
            ))}
            <div className="container bg-primary-light rounded-3xl mx-auto px-4 py-7">
              <div className="flex items-center gap-3">
                <span className="text-yellow-500 text-2xl">⚠️</span>
                <p className="text-primary-dark font-medium text-base m-0">
                  You won't receive the books that are not available for delivery. Consider placing your order once all the books are available in the bookstore.
                </p>
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
            {books.filter(b => b.store === "ΜΠΕΝΟΥ & ΣΙΑ Ε.Ε.").map(book => (
              <label key={book.id} className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    checked={selectedBooks.some(b => b.id === book.id)}
                    disabled={!book.available}
                    onChange={() => toggleBook(book)}
                    className="w-5 h-5 accent-primary-dark"
                  />
                  <span className="text-primary-dark font-medium text-lg flex-shrink max-w-[650px]">{book.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-white font-medium text-md px-7 py-2 rounded-full ${book.available ? "bg-green-500" : "bg-red-400"}`}>
                    {book.available ? "Available" : "Unavailable"}
                  </span>
                  <span className="text-primary-dark font-semibold text-xl whitespace-nowrap">{book.price} €</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Δεξιά στήλη: Summary */}
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 sticky top-6 self-start border-3 border-secondary-border shadow-sm bg-white-light px-4 py-5 sm:px-6 sm:py-6 rounded-3xl mx-auto">
          <h3 className="flex items-center gap-2 text-lg font-bold text-primary-dark mb-6 text-center md:text-left">
            <ReceiptText className="w-5 h-5 text-primary-dark" />
            Summary
          </h3>
          <div className="flex justify-between items-center text-gray-600 mb-4">
            <p>Total amount</p>
            <span className="text-primary-dark font-semibold">{totalPrice} €</span>
          </div>
          <div className="flex justify-between items-center text-gray-600 font-medium mb-4">
            <p>Books selected</p>
            <span className="text-primary-dark font-semibold">{selectedBooks.length}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600 font-medium mb-6">
            <p>Stores</p>
            <span className="text-primary-dark font-semibold">{uniqueStores.length}</span>
          </div>
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleContinue} 
              className="bg-primary-dark text-white py-2 px-10 rounded-3xl font-semibold hover:bg-primary-dark/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
