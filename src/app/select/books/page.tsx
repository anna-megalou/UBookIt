"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReceiptText } from "lucide-react";

// Τύποι Δεδομένων
interface DeclaredBook {
  bookId: string;
  bookTitle: string;
  publisher: string;
}

interface Book extends DeclaredBook {
  id: number; 
  price: number;
  store: string; 
  available: boolean;
  days: string;
}

interface PublisherGroup {
  publisherName: string;
  books: Book[];
  deliveryDays: string;
}

export default function SelectBooks() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allBooks, setAllBooks] = useState<Book[]>([]); 
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = sessionStorage.getItem('eleyth-declared-books');
      if (storedData) {
        const declaredBooks: DeclaredBook[] = JSON.parse(storedData);
        
        const enrichedBooks = declaredBooks.map((declaredBook, index) => {
          const isAvailable = index % 3 !== 0; // Κάθε τρίτο βιβλίο είναι Unavailable
          const price = isAvailable ? (index % 2 === 0 ? 2.0 : 1.5) : 0;
          const days = declaredBook.publisher.includes('Broken') ? "2-4 Days" : "1-3 Days";
          
          return {
            ...declaredBook,
            id: index + 1,
            price: price,
            store: declaredBook.publisher, // Υποθέτουμε ότι ο εκδότης είναι το βιβλιοπωλείο
            available: isAvailable,
            days: days,
          } as Book;
        });

        setAllBooks(enrichedBooks);
      } else {
        // Εάν δεν υπάρχουν δεδομένα, ανακατευθύνσου στην αρχική σελίδα
        router.push('/'); 
      }
      setLoading(false);
    }
  }, [router]);
  
  const groupedPublishers: PublisherGroup[] = useMemo(() => {
    const groups: Record<string, PublisherGroup> = {};

    allBooks.forEach(book => {
      const store = book.store;
      if (!groups[store]) {
        groups[store] = {
          publisherName: store,
          books: [],
          deliveryDays: book.days,
        };
      }
      groups[store].books.push(book);
    });

    return Object.values(groups);
  }, [allBooks]);

  const toggleBook = (book: Book) => {
    if (selectedBooks.some(b => b.bookId === book.bookId)) {
      setSelectedBooks(selectedBooks.filter(b => b.bookId !== book.bookId));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const storeTotals = selectedBooks.reduce((acc: Record<string, number>, book) => {
    acc[book.store] = (acc[book.store] || 0) + book.price;
    return acc;
  }, {});

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('el-GR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2, 
    }).format(price);
};
  
  const totalPrice = selectedBooks.reduce((sum, book) => sum + book.price, 0);
  const uniqueStores = [...new Set(selectedBooks.map(b => b.store))];

  if (loading) {
    return <p className="text-center mt-10">Προετοιμασία επιλογών...</p>;
  }

  return (
    <div className="container bg-white rounded-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-center lg:justify-start items-start px-16 pt-7 pb-15">
        <h1 className="text-4xl font-bold text-primary-dark">
          Επίλεξε τα συγγράμματα που θέλεις να σου αποσταλούν
        </h1>
      </div>

      {/* Flex container για δύο στήλες */}
      <div className="flex flex-col lg:flex-row gap-10 px-6 lg:px-16">
        
        {/* Αριστερή στήλη: ΔΥΝΑΜΙΚΑ Cards */}
        <div className="flex-1 grid auto-rows-auto gap-y-5 pb-20">
          
          {groupedPublishers.map((publisherGroup, index) => (
            <div
              key={index}
              className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full"
            >
              {/* Εκδότης και Χρόνος Παράδοσης */}
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-semibold text-primary-dark">
                  {publisherGroup.publisherName}
                </h4>
                <span className="text-md text-gray-500">
                  {publisherGroup.deliveryDays}
                </span>
              </div>

              {/* Λίστα Βιβλίων για αυτόν τον Εκδότη */}
              <div className="flex flex-col gap-2">
                {publisherGroup.books.map((book) => {
                    const isSelected = selectedBooks.some(b => b.bookId === book.bookId);
                    const isUnavailable = !book.available;
                    const bgColor = isUnavailable ? "bg-red-400" : "bg-green-500";
                    
                    return (
                        <label key={book.bookId} className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-200 cursor-pointer">
                            <div className="flex items-center gap-5 flex-1">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    disabled={isUnavailable}
                                    onChange={() => toggleBook(book)}
                                    className="w-5 h-5 accent-primary-dark"
                                />
                                <span className="text-primary-dark font-medium text-lg flex-1">
                                    {book.bookTitle}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                                <span className={`text-white font-medium text-md px-4 py-1 rounded-full whitespace-nowrap ${bgColor}`}>
                                    {book.available ? "Available" : "Unavailable"}
                                </span>
                                {book.price > 0 && (
                                    <span className="text-primary-dark font-semibold text-xl whitespace-nowrap">
                                        {formatPrice(book.price)} 
                                    </span>
                                )}
                            </div>
                        </label>
                    );
                })}
              </div>

              {/* Ειδικό μήνυμα για μη διαθέσιμα βιβλία (αν υπάρχει έστω ένα) */}
              {publisherGroup.books.some(b => !b.available) && (
                <div className="container bg-primary-light rounded-3xl mx-auto px-4 py-4 mt-4">
                    <div className="flex items-center gap-3">
                        <span className="text-yellow-500 text-2xl">⚠️</span>
                        <p className="text-primary-dark font-medium text-base m-0 flex-1">
                            You won't receive the books that are not available for delivery. Consider placing your order once all the books are available in the bookstore.
                        </p>
                        <button className="bg-primary-dark text-white px-7 py-2 rounded-3xl font-semibold hover:bg-secondary-light transition-colors whitespace-nowrap">
                            Notify Me
                        </button>
                    </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Δεξιά στήλη: Summary */}
        <div className="w-full lg:w-1/3 xl:w-1/4 sticky lg:top-6 self-start border-3 border-secondary-border shadow-sm bg-white-light px-4 py-5 sm:px-6 sm:py-6 rounded-3xl mx-auto">
          <h3 className="flex items-center gap-2 text-lg font-bold text-primary-dark mb-6 text-center lg:text-left">
            <ReceiptText className="w-5 h-5 text-primary-dark" />
            Summary
          </h3>
          <div className="flex justify-between items-center text-gray-600 mb-4">
            <p>Total amount</p>
            <span className="text-primary-dark font-semibold">{formatPrice(totalPrice)} </span>
          </div>
          <div className="flex justify-between items-center text-gray-600 font-medium mb-4">
            <p>Books selected</p>
            <span className="text-primary-dark font-semibold">{selectedBooks.length}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600 font-medium mb-6">
            <p>Stores</p>
            <span className="text-primary-dark font-semibold">{uniqueStores.length}</span>
          </div>

          {/* FORM POST προς JSP */}
          <form
            method="POST"
            action="http://ism.dmst.aueb.gr/ismgroup17/orderbooks.jsp"
            className="flex justify-center mt-6"
          >
            <input type="hidden" name="totalPrice" value={totalPrice.toFixed(2)} />
            {Object.entries(storeTotals).map(([store, price]) => (
                <div key={store}>
                  <input type="hidden" name="storeName" value={store} />
                  <input type="hidden" name="storePrice" value={price.toFixed(2)} />
                </div>
              ))}
            <button
              type="submit"
              className="bg-primary-dark text-white py-2 px-10 rounded-3xl font-semibold hover:bg-primary-dark/90 transition-colors"
              disabled={selectedBooks.length === 0}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}