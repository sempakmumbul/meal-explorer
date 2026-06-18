"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const q = search.trim();

    if (!q) {
      router.push("/");
      return;
    }

    router.push(
  `/?search=${encodeURIComponent(q)}#results`
);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        className="
          flex items-center
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-sm
          transition-all
          duration-200
          focus-within:border-orange-400
          focus-within:ring-4
          focus-within:ring-orange-100
        "
      >
        {/* Search Icon */}
        <Search
          size={20}
          className="ml-4 text-slate-400"
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="
            flex-1
            bg-transparent
            px-4
            py-4
            text-sm
            text-slate-700
            outline-none
          "
        />

        {/* Clear Button */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="
              p-2
              text-slate-400
              transition
              hover:text-red-500
            "
          >
            <X size={18} />
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="
            m-2
            rounded-xl
            bg-orange-500
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-orange-600
          "
        >
          Search
        </button>
      </div>
    </div>
  );
}