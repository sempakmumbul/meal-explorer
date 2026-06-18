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

    router.push(`/?search=${encodeURIComponent(q)}#results`);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-0">
      <div
        className="
          flex flex-col sm:flex-row sm:items-center
          gap-3 sm:gap-0
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
        {/* INPUT ROW */}
        <div className="flex items-center flex-1 px-4 py-3 sm:py-0">
          <Search size={18} className="text-slate-400 shrink-0" />

          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="
              w-full
              bg-transparent
              px-3
              text-sm
              text-slate-700
              outline-none
            "
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-slate-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSearch}
          className="
            w-full sm:w-auto
            rounded-xl
            bg-orange-500
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-orange-600
            sm:m-2
          "
        >
          Search
        </button>
      </div>
    </div>
  );
}