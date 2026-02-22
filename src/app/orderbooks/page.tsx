'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, MapPin, ArrowRight } from 'lucide-react';

interface StoreEntry {
  name: string;
  price: string;
}

interface OrderData {
  userId: string;
  declarationId: string;
  totalPrice: string;
  selectedBookIds: string[];
  stores: StoreEntry[];
}

export default function OrderBooks() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const raw = sessionStorage.getItem('orderData');
    if (!raw) {
      router.push('/select/books');
      return;
    }

    try {
      const parsed: OrderData = JSON.parse(raw);
      setOrderData(parsed);
    } catch {
      router.push('/select/books');
    }
  }, [router]);

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat('el-GR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(price);

  const totalNum = parseFloat(orderData?.totalPrice ?? '0');

  const handleContinue = () => {
    formRef.current?.submit();
  };

  if (!orderData) {
    return <p className="text-center mt-10">Φόρτωση...</p>;
  }

  return (
    <div className="container bg-white rounded-4xl mx-auto px-4 py-6">
      {/* Page Title */}
      <div className="flex justify-center lg:justify-start items-start px-6 lg:px-16 pt-7 pb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary-dark max-w-2xl">
          Συμπλήρωσε τα στοιχεία αποστολής για την παραγγελία σου
        </h1>
      </div>

      {/* Hidden form that POSTs to the JSP controller */}
      <form
        ref={formRef}
        method="POST"
        action="http://ism.dmst.aueb.gr/ismgroup17/selectbooksController.jsp"
        className="hidden"
      >
        <input type="hidden" name="userId" value={orderData.userId} />
        <input type="hidden" name="declarationId" value={orderData.declarationId} />
        <input type="hidden" name="totalPrice" value={orderData.totalPrice} />
        {orderData.selectedBookIds.map((bookId) => (
          <input key={bookId} type="hidden" name="selectedBookIds" value={bookId} />
        ))}
        {orderData.stores.map((store) => (
          <div key={store.name}>
            <input type="hidden" name="storeName" value={store.name} />
            <input type="hidden" name="storePrice" value={store.price} />
          </div>
        ))}
      </form>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-10 px-6 lg:px-16 pb-10">
        {/* Left: Forms */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Personal Details */}
          <section className="border-3 border-secondary-border shadow-sm rounded-3xl p-8 w-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary-light rounded-xl">
                <User className="w-5 h-5 text-primary-dark" />
              </div>
              <h2 className="text-xl font-bold text-primary-dark tracking-tight">
                Personal Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <FloatingInput label="Academic ID" type="text" />
              <FloatingInput label="Identity ID" type="text" />
              <FloatingInput label="Name" type="text" />
              <FloatingInput label="Surname" type="text" />
              <FloatingInput label="Email" type="email" />
              <FloatingInput label="Phone" type="tel" />
            </div>
          </section>

          {/* Location Details */}
          <section className="border-3 border-secondary-border shadow-sm rounded-3xl p-8 w-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary-light rounded-xl">
                <MapPin className="w-5 h-5 text-primary-dark" />
              </div>
              <h2 className="text-xl font-bold text-primary-dark tracking-tight">
                Location Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <FloatingInput label="City" type="text" />
              <FloatingInput label="Prefecture" type="text" />
              <FloatingInput label="Address" type="text" />
              <FloatingInput label="Postal Code" type="text" />
            </div>
          </section>
        </div>

        {/* Right: Payment Summary */}
        <div className="w-full lg:w-[360px] flex-shrink-0 sticky top-28 self-start flex flex-col items-center gap-4">
          <div className="border-3 border-secondary-border shadow-sm rounded-3xl w-full overflow-hidden">
            <div className="p-8">
              <h3 className="text-xl font-bold text-primary-dark text-center mb-8">
                Proceed your payment
              </h3>

              {/* Amount */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-secondary-dark font-medium">Amount</span>
                <span className="text-primary-dark font-bold text-lg">
                  {formatPrice(totalNum)}
                </span>
              </div>

              {/* Store Breakdown */}
              {orderData.stores.length > 0 && (
                <div className="border-t border-secondary-border pt-5 mb-8 space-y-3">
                  {orderData.stores.map((store, i) => (
                    <div key={i} className="flex justify-between items-start gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-primary-dark shrink-0 mt-1.5" />
                        <span className="text-sm font-medium text-primary-dark leading-tight">
                          {store.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-primary-dark whitespace-nowrap">
                        {formatPrice(parseFloat(store.price))}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Continue Button */}
              <button
                type="button"
                onClick={handleContinue}
                className="w-full bg-primary-dark hover:bg-secondary-dark text-white font-bold py-4 rounded-3xl transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
              >
                Continue
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingInput({
  label,
  type,
}: {
  label: string;
  type: string;
}) {
  const [value, setValue] = useState('');
  const id = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        className="peer w-full px-5 py-4 rounded-2xl border-2 border-secondary-border bg-white text-primary-dark text-base focus:border-primary-dark focus:outline-none transition-all placeholder:text-secondary-typography"
      />
      <label
        htmlFor={id}
        className="absolute left-4 -top-2.5 bg-white px-1.5 text-xs font-semibold text-primary-dark opacity-0 -translate-y-1 transition-all duration-200 pointer-events-none peer-not-placeholder-shown:opacity-100 peer-not-placeholder-shown:translate-y-0 peer-focus:opacity-100 peer-focus:translate-y-0"
      >
        {label}
      </label>
    </div>
  );
}
