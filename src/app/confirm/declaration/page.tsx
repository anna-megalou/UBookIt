"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Χρησιμοποιούμε useRouter για navigation μετά την αποθήκευση

// Ορισμός των τύπων δεδομένων
interface BookData {
  bookId: string;
  bookTitle: string;
  publisher: string; // Προσθέτουμε τον εκδότη εδώ για ευκολία
}

interface PublisherGroup {
  publisher: string;
  books: Array<{ bookId: string; bookTitle: string }>;
}

export default function Home() {
  const [publishers, setPublishers] = useState<PublisherGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://96db88d3-420a-470b-b0e4-32ca112bcde6.mock.pstmn.io"
        );

        if (!response.ok) {
          throw new Error("Αποτυχία φόρτωσης δεδομένων");
        }

        const data = await response.json();
        
        // Παίρνουμε ΜΟΝΟ αυτό που χρειαζόμαστε
        const fetchedPublishers: PublisherGroup[] = data.publishers.publishers;
        setPublishers(fetchedPublishers);
        
        // *** 💡 Βήμα 1: Προετοιμασία δεδομένων για την επόμενη σελίδα ***
        // Μετατρέπουμε τη δομή σε μια επίπεδη λίστα βιβλίων
        const allBooks: BookData[] = [];
        fetchedPublishers.forEach(group => {
            group.books.forEach(book => {
                allBooks.push({
                    bookId: book.bookId,
                    bookTitle: book.bookTitle,
                    publisher: group.publisher, // Προσθέτουμε τον εκδότη
                });
            });
        });
        
        // Αποθήκευση στο Session Storage για χρήση στην επόμενη σελίδα
        sessionStorage.setItem('eleyth-declared-books', JSON.stringify(allBooks));


      } catch (err) {
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
      <div className="flex flex-col items-center w-full">

        {/* Τίτλος */}
        <div className="px-25 pt-20 pb-14">
          <h1 className="text-4xl font-bold text-primary-dark">
            Επιβεβαίωσε τα συγγράμματα που έχεις δηλώσει στον Εύδοξο
          </h1>
        </div>

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
                <div key={book.bookId} className="mb-2">
                  <p className="text-lg">📘 {book.bookTitle}</p>
                  <span className="text-sm text-gray-500">
                    ISBN: {book.bookId}
                  </span>
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
