"use client";
import React, { useState } from "react";

const Faqs = ({ faqs }) => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = key => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl ">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Find answers to common questions about our blog and content.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map(faq => (
          <div
            key={faq._key}
            className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
            <button
              className="w-full rounded-lg px-6 py-4 text-left"
              onClick={() => toggleItem(faq._key)}>
              <div className="flex items-center justify-between">
                <h3 className="pr-4 text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <svg
                  className={`h-5 w-5 transform text-gray-500 transition-transform duration-200 ${
                    openItem === faq._key ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            <div
              className={`px-6 pb-4 transition-all duration-200 ${
                openItem === faq._key ? "block" : "hidden"
              }`}>
              <div className="border-t border-gray-100 pt-4">
                <p className="leading-relaxed text-gray-700">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
