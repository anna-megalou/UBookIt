"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ReceiptText } from "lucide-react";
import React from "react";

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
  const [selectedPublishers, setSelectedPublishers] = useState<Set<string>>(new Set());

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

  const togglePublisher = (publisherName: string) => {
    setSelectedPublishers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(publisherName)) {
        newSet.delete(publisherName);
      } else {
        newSet.add(publisherName);
      }
      return newSet;
    });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('el-GR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2, 
    }).format(price);
  };

  // Calculate totals for selected publishers
  const selectedBooks = useMemo(() => {
    return allBooks.filter(
      book => selectedPublishers.has(book.store) && book.available
    );
  }, [allBooks, selectedPublishers]);


  const storeTotals = useMemo(() => {
    return selectedBooks.reduce((acc: Record<string, number>, book) => {
      acc[book.store] = (acc[book.store] || 0) + book.price;
      return acc;
    }, {});
  }, [selectedBooks]);
  
  const totalPrice = useMemo(() => {
    return selectedBooks.reduce((sum, book) => sum + book.price, 0);
  }, [selectedBooks]);

  const uniqueStores = useMemo(() => {
    return [...new Set(selectedBooks.map(b => b.store))];
  }, [selectedBooks]);

  // Calculate publisher totals
  const getPublisherTotal = (publisherGroup: PublisherGroup): number => {
    return publisherGroup.books.reduce((sum, book) => sum + book.price, 0);
  };

  const hasUnavailableBooks = (publisherGroup: PublisherGroup): boolean => {
    return publisherGroup.books.some(book => !book.available);
  };

  const hasAvailableBooksSelected = selectedBooks.some(book => book.available);

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
          
          {groupedPublishers.map((publisherGroup, index) => {
            const isPublisherSelected = selectedPublishers.has(publisherGroup.publisherName);
            const publisherHasUnavailable = hasUnavailableBooks(publisherGroup);
            const publisherTotal = getPublisherTotal(publisherGroup);
            const showWarning = isPublisherSelected && publisherHasUnavailable;

            return (
              <div
                key={index}
                className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl w-full"
              >
                <div className="flex gap-4">
                  {/* Checkbox for the entire card */}
                  <div className="flex-shrink-0 pt-1">
                    <input
                      type="checkbox"
                      checked={isPublisherSelected}
                      onChange={() => togglePublisher(publisherGroup.publisherName)}
                      className="w-5 h-5 accent-primary-dark cursor-pointer"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Publisher Name */}
                    <h4 className="text-xl font-semibold text-primary-dark mb-3">
                      {publisherGroup.publisherName}
                    </h4>

                    {/* Book Titles */}
                    <div className="flex flex-col gap-2 mb-4">
                      {publisherGroup.books.map((book) => (
                        <div key={book.bookId} className="text-primary-dark font-medium text-lg">
                          {book.bookTitle}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Delivery Time, Availability Badges, and Price */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-4">
                    {/* Delivery Time */}
                    <span className="text-md text-gray-500">
                      {publisherGroup.deliveryDays}
                    </span>

                    {/* Availability Badges and Price - Horizontal Layout */}
                    <div className="flex items-center gap-4">
                      {/* Availability Badges */}
                      <div className="flex flex-col gap-2">
                        {publisherGroup.books.map((book) => {
                          const bgColor = book.available ? "bg-green-500" : "bg-red-500";
                          return (
                            <span
                              key={book.bookId}
                              className={`text-white font-semibold text-sm px-4 py-1.5 rounded-3xl whitespace-nowrap w-[120px] text-center ${bgColor}`}
                            >
                              {book.available ? "Available" : "Unavailable"}
                            </span>
                          );
                        })}
                      </div>

                      {/* Total Price */}
                      <span className="text-primary-dark font-semibold text-xl">
                        {formatPrice(publisherTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Warning Message - Only show when card is selected AND has unavailable books */}
                {showWarning && (
                  <div className="bg-primary-light rounded-3xl px-4 py-4 mt-10 mb-4 w-full">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-yellow-500 text-2xl flex-shrink-0">⚠️</span>
                        <p className="text-primary-dark font-medium text-base m-0">
                          You won&apos;t receive the books that are not available for delivery, consider placing your order once all the books are available in the bookstore.
                        </p>
                      </div>
                      <button className="bg-primary-dark text-white px-7 py-2 rounded-3xl font-semibold hover:bg-secondary-light transition-colors whitespace-nowrap flex items-center gap-2 flex-shrink-0">
                        <span>🔔</span>
                        Notify me
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
  action="http://ism.dmst.aueb.gr/ismgroup17/selectbooksController.jsp"
  className="flex justify-center mt-6"
>
  <input type="hidden" name="totalPrice" value={totalPrice.toFixed(2)} />
  
  {selectedBooks.map((book) => (
    <React.Fragment key={book.id}>
      {/* 1. Το ID του βιβλίου */}
      <input type="hidden" name="selectedBookIds" value={book.id} />
      
      {/* 2. Το όνομα του εκδότη (που εσύ ονομάζεις storeName στον Controller) */}
      <input type="hidden" name="storeName" value={book.publisher} />
      
      {/* 3. Η τιμή του βιβλίου (που εσύ ονομάζεις storePrice στον Controller) */}
      <input type="hidden" name="storePrice" value={book.price} />
    </React.Fragment>
  ))}

  <button
    type="submit"
    className="bg-primary-dark text-white py-2 px-10 rounded-3xl font-semibold hover:bg-primary-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={selectedPublishers.size === 0 || !hasAvailableBooksSelected}
  >
    Continue
  </button>
</form>
        </div>
      </div>
    </div>
  );
}