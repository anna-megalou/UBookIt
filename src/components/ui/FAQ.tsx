"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = "Συχνές Ερωτήσεις" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full pb-30 pt-0 mt-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-4xl font-bold text-primary-dark mb-12 text-center">
            {title}
          </h2>
        )}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-secondary-border rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-inset"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-primary-dark pr-8">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-secondary-dark flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 py-4 bg-primary-light border-t border-secondary-border">
                  <p className="text-secondary-dark leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
