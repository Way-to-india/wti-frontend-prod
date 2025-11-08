"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaqQuestion } from '@/types/comman';

type Props = {
  faq: FaqQuestion[];
};
  
export default function TourFAQ({ faq }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faq?.length)
    return (
      <p className="text-gray-500 text-center py-6">
        No FAQ available at the moment.
      </p>
    );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col divide-y divide-gray-200">
        {faq.map((item, i) => (
          <div
            key={i}
            className="py-4 transition-all duration-300 ease-in-out"
          >
            <button
              onClick={() => toggleFAQ(i)}
              className="flex justify-between items-center w-full text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-800 hover:text-orange-500 transition-colors">
                {item.question}
              </span>
              {openIndex === i ? (
                <ChevronUp className="text-orange-500 w-5 h-5" />
              ) : (
                <ChevronDown className="text-gray-500 w-5 h-5" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <p className="text-gray-700 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
