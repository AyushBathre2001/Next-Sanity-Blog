"use client";
import { getSearchResults } from "@/lib/sanity/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const results = await getSearchResults(query);
    setResults(results);
  };

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="hidden md:block">
      <div className="w-full min-w-[200px] max-w-sm">
        <div className=" relative flex h-[40px] items-center rounded-md border border-slate-200 bg-transparent pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#334155"
            viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
          <input
            className="ease w-full pl-2 pr-28 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            placeholder="Search blog..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        {!!results.length && (
          <div className="absolute flex flex-col gap-2 font-sans z-10 w-full max-w-[340px] rounded-md bg-white p-3 text-[14px] shadow-md">
            {results.map(result => (
              <Link
                key={result?._id}
                href={`/post/${result?.slug?.current}`}
                className="hover:underline">
                <h2>{result?.title}</h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavSearch;
