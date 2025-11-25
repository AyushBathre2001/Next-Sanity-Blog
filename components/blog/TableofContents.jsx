// components/blog/tableOfContents.jsx
"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(heading => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-8 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="font-bebas_neue mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Table of Contents
      </div>
      <nav className="space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
        {headings.map(heading => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block border-l-2 pl-4 text-sm transition-all hover:text-blue-600 dark:hover:text-blue-400 ${
              activeId === heading.id
                ? "border-blue-600 font-medium text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-600 hover:border-gray-300 dark:text-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={e => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth"
              });
            }}>
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
