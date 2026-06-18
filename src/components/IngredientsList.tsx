"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Ingredient = {
  idIngredient: string;
  strIngredient: string;
};

export default function IngredientsList({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  const [query, setQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("A");

  // filter by search first
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return ingredients;

    return ingredients.filter((i) =>
      i.strIngredient.toLowerCase().includes(q)
    );
  }, [ingredients, query]);

  // group by alphabet
  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, Ingredient[]>>((acc, item) => {
      const letter = item.strIngredient[0].toUpperCase();

      if (!acc[letter]) acc[letter] = [];

      acc[letter].push(item);

      return acc;
    }, {});
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  // only selected letter data
  const activeList = grouped[selectedLetter] || [];

  return (
    <div className="space-y-8">

      {/* SEARCH */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
            Ingredients
          </p>

          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-sm text-slate-500 hover:text-orange-500"
            >
              Clear
            </button>
          )}
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ingredient..."
          className="
            w-full rounded-xl border px-4 py-3 text-sm
            bg-slate-50 focus:bg-white outline-gray-300 focus:outline-orange-400
            focus:ring-4 focus:ring-orange-100
            focus:border-orange-400
            text-gray-700 placeholder:text-gray-300
          "
        />
      </div>

      {/* ALPHABET SELECTOR */}
      <div className="flex flex-wrap justify-center gap-2">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`
              px-3 py-2 rounded-lg text-xs font-medium border transition
              ${
                selectedLetter === letter
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-orange-50"
              }
            `}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {activeList.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-500">
            No ingredients in letter "{selectedLetter}"
          </p>
        </div>
      )}

      {/* ACTIVE LIST ONLY */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white font-bold">
            {selectedLetter}
          </div>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {activeList.map((ingredient) => (
            <Link
              key={ingredient.idIngredient}
              href={`/ingredients/${ingredient.strIngredient}`}
              className="
                rounded-xl border bg-white p-3 shadow-sm
                transition hover:-translate-y-1 hover:shadow-md
              "
            >
              <span className="text-sm font-medium text-slate-700">
                {ingredient.strIngredient}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}