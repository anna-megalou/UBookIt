"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Ορισμός των τύπων δεδομένων
interface BookData {
  courseTitle: string;
  semester: number;
  bookTitle: string;
  isbn: string;
  authors: string;
  publisher: string;
  bookId: string;
  price: number;
}

interface PublisherGroup {
  publisher: string;
  books: BookData[];
}

export default function Home() {
  const [publishers, setPublishers] = useState<PublisherGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Wait a bit to ensure storage is ready (in case of race condition)
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Get userId from localStorage or sessionStorage
        const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
        console.log('Confirmation page - User ID from storage:', userId);
        console.log('localStorage userId:', localStorage.getItem('userId'));
        console.log('sessionStorage userId:', sessionStorage.getItem('userId'));
        
        if (!userId || userId === 'undefined' || userId === 'null') {
          console.error('UserId is missing or invalid:', userId);
          throw new Error("User ID not found. Please sign in again.");
        }

        const url = `https://ubookit-ja0e.onrender.com/user/confirm/declaration?userId=${userId}`;
        console.log('Confirmation page - Fetching from URL (GET):', url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Confirmation page - Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          throw new Error(`Αποτυχία φόρτωσης δεδομένων (${response.status}): ${errorText || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        // Check if the response is successful
        if (data.code !== 0) {
          throw new Error(data.message || "Αποτυχία φόρτωσης δεδομένων");
        }

        // Get books from the response
        const books: BookData[] = data.books?.books || [];

        // Group books by publisher
        const publisherMap = new Map<string, BookData[]>();
        books.forEach((book) => {
          if (!publisherMap.has(book.publisher)) {
            publisherMap.set(book.publisher, []);
          }
          publisherMap.get(book.publisher)!.push(book);
        });

        // Convert map to array
        const fetchedPublishers: PublisherGroup[] = Array.from(publisherMap.entries()).map(
          ([publisher, books]) => ({
            publisher,
            books,
          })
        );

        setPublishers(fetchedPublishers);

        // *** 💡 Βήμα 1: Προετοιμασία δεδομένων για την επόμενη σελίδα ***
        // Μετατρέπουμε τη δομή σε μια επίπεδη λίστα βιβλίων
        const allBooks: Array<{ bookId: string; bookTitle: string; publisher: string }> = [];
        books.forEach((book) => {
          allBooks.push({
            bookId: book.bookId,
            bookTitle: book.bookTitle,
            publisher: book.publisher,
          });
        });

        // Αποθήκευση στο Session Storage για χρήση στην επόμενη σελίδα
        sessionStorage.setItem(
          "eleyth-declared-books",
          JSON.stringify(allBooks)
        );
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err instanceof Error ? err.message : "Ένα σφάλμα προέκυψε");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Φόρτωση συγγραμμάτων...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="container bg-white rounded-4xl mx-auto px-auto">
      {/* Τίτλος */}
      <h1 className="text-4xl font-bold text-primary-dark pl-40 py-15">
          Επιβεβαίωσε τα συγγράμματα που έχεις δηλώσει στον Εύδοξο
        </h1>
      <div className="flex flex-col items-center w-full">

        {/* Cards */}
        <div className="grid gap-10 w-full max-w-7xl mx-auto px-6">
          {publishers.map((publisherItem, index) => (
            <div
              key={index}
              className="border-3 border-secondary-border shadow-sm bg-white-light px-6 py-6 rounded-3xl"
            >
              {/* Εκδότης */}
              <h4 className="text-xl font-semibold text-primary-dark mb-4">
                {publisherItem.publisher}
              </h4>

              {/* Βιβλία */}
              {publisherItem.books.map((book) => (
                <div key={book.bookId} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <p className="text-lg font-semibold text-primary-dark mb-1">
                    📘 {book.bookTitle}
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Μάθημα:</span> {book.courseTitle}</p>
                    <p><span className="font-medium">Εξάμηνο:</span> {book.semester}</p>
                    <p><span className="font-medium">Συγγραφείς:</span> {book.authors}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Button */}
          <div className="justify-self-center mt-6 pb-20">
            {/* Χρησιμοποιούμε Link, αλλά τα δεδομένα έχουν ήδη αποθηκευτεί */}
            <Link
              href="/select/books"
              className="bg-primary-dark text-white font-bold text-lg rounded-full px-15 py-5 hover:bg-secondary-light transition-colors whitespace-nowrap"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
