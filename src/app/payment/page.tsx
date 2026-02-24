"use client";

import { useState } from "react";
import Link from "next/link";
import { IconShieldCheck, IconLoader2, IconCircleCheck } from "@tabler/icons-react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [shippingMethod, setShippingMethod] = useState<"ADDRESS" | "BOX_NOW">("ADDRESS");
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "COD">("CARD");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cvv, setCvv] = useState("");

  const extraFee = paymentMethod === "COD" ? 1.0 : 0.0;
  const deliveryFee = 2.0;
  const total = deliveryFee + extraFee;

  const formatEuro = (n: number) =>
    n.toLocaleString("el-GR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

  const handleSubmit = async () => {
    setError(null);

    if (paymentMethod === "CARD") {
      if (!cardNumber.trim() || !expirationDate.trim() || !nameOnCard.trim() || !cvv.trim()) {
        setError("Please fill in all card details before continuing.");
        return;
      }
    }

    setLoading(true);

    try {
      const payload: Record<string, string> = {
        shippingMethod,
        paymentMethod,
      };

      if (paymentMethod === "CARD") {
        payload.cardNumber = cardNumber;
        payload.expirationDate = expirationDate;
        payload.nameOnCard = nameOnCard;
        payload.cvv = cvv;
      }

      const res = await fetch("http://localhost:8080/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `Server error (${res.status})`);
      }

      setPaymentSuccess(true);
    } catch (err: unknown) {
      let message = "Something went wrong. Please try again.";
      if (err instanceof Error) {
        message = err.message === "Failed to fetch"
          ? "Unable to connect to the payment server. Please ensure the backend is running at http://localhost:8080 and try again."
          : err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="container bg-white rounded-4xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center py-20 px-8">
          <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center mb-6">
            <IconCircleCheck className="w-16 h-16 text-accents-green" strokeWidth={2} />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-dark mb-3">
            Payment completed successfully!
          </h2>
          <p className="text-secondary-typography text-lg text-center max-w-md mb-8">
            Thank you for your order. Your payment has been processed.
          </p>
          <Link
            href="/"
            className="px-8 py-3 bg-primary-dark text-white font-semibold rounded-full hover:bg-secondary-dark transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container bg-white rounded-4xl mx-auto px-4 py-6">
      <div className="flex justify-center lg:justify-start items-start px-8 lg:px-16 pt-7 pb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary-dark">
          Συμπλήρωσε τα στοιχεία αποστολής για την παραγγελία σου
        </h1>
      </div>

      {error && (
        <div className="mx-8 lg:mx-16 mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 px-8 lg:px-16 pb-10">
        {/* Left side */}
        <div className="flex flex-col gap-8 flex-[3]">
          {/* Shipping method */}
          <div className="border-3 border-secondary-border shadow-sm rounded-3xl p-8 w-full">
            <h2 className="text-2xl font-semibold text-primary-dark mb-6">Shipping method</h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="ADDRESS"
                  checked={shippingMethod === "ADDRESS"}
                  onChange={() => setShippingMethod("ADDRESS")}
                  className="w-5 h-5 accent-primary-dark"
                />
                <span className="text-primary-dark font-medium text-lg">Address</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="BOX_NOW"
                  checked={shippingMethod === "BOX_NOW"}
                  onChange={() => setShippingMethod("BOX_NOW")}
                  className="w-5 h-5 accent-primary-dark"
                />
                <span className="text-primary-dark font-medium text-lg">BOX NOW</span>
              </label>
            </div>
          </div>

          {/* Payment method */}
          <div className="border-3 border-secondary-border shadow-sm rounded-3xl p-8 w-full">
            <h2 className="text-2xl font-semibold text-primary-dark mb-6">Payment method</h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="w-5 h-5 accent-primary-dark"
                />
                <span className="text-primary-dark font-medium text-lg">Cash on delivery (+1,00€)</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="CARD"
                  checked={paymentMethod === "CARD"}
                  onChange={() => setPaymentMethod("CARD")}
                  className="w-5 h-5 accent-primary-dark"
                />
                <span className="text-primary-dark font-medium text-lg">Card</span>
              </label>
            </div>

            {paymentMethod === "CARD" && (
              <div className="mt-8 ml-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-secondary-border bg-white text-secondary-dark placeholder:text-secondary-typography focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-2">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-secondary-border bg-white text-secondary-dark placeholder:text-secondary-typography focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-secondary-border bg-white text-secondary-dark placeholder:text-secondary-typography focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-secondary-border bg-white text-secondary-dark placeholder:text-secondary-typography focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 flex flex-col gap-8 items-stretch min-w-[260px]">
          {/* Final amount */}
          <div className="border-3 border-secondary-border shadow-sm rounded-3xl p-8 w-full">
            <h2 className="text-2xl font-semibold text-primary-dark mb-6">Final amount</h2>
            <div className="flex justify-between mb-2">
              <span className="text-primary-dark font-medium text-lg">Delivery</span>
              <span className="text-primary-dark font-medium text-lg">{formatEuro(deliveryFee)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-primary-dark font-medium text-lg">Additional</span>
              <span className="text-primary-dark font-medium text-lg">{formatEuro(extraFee)}</span>
            </div>
            <hr className="border-secondary-border mb-4" />
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span className="text-primary-dark font-bold text-lg">Total</span>
              <span className="text-primary-dark font-bold text-lg">{formatEuro(total)}</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-primary-dark hover:bg-secondary-dark text-white py-3 rounded-3xl font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  Submitting...
                  <IconLoader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                "Confirm"
              )}
            </button>
          </div>

          {/* Secure encryption illustration */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <IconShieldCheck className="w-12 h-12 text-primary-dark" />
            </div>
            <p className="text-secondary-typography text-sm text-center leading-relaxed">
              Secure encryption for all your<br />transactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
