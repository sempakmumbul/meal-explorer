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

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return ingredients;

    return ingredients.filter((ingredient) =>
      ingredient.strIngredient
        .toLowerCase()
        .includes(q)
    );
  }, [ingredients, query]);

  const grouped = useMemo(() => {
    return filtered.reduce<
      Record<string, Ingredient[]>
    >((acc, ingredient) => {
      const letter =
        ingredient.strIngredient[0].toUpperCase();

      if (!acc[letter]) {
        acc[letter] = [];
      }

      acc[letter].push(ingredient);

      return acc;
    }, {});
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="space-y-8">

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
              Search
            </p>

            <h3 className="text-sm font-semibold text-slate-900">
              Find Ingredients
            </h3>
          </div>

          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-sm text-slate-500 transition hover:text-orange-500"
            >
              Clear
            </button>
          )}
        </div>

        <input
          type="text"
          placeholder="Search ingredient..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-orange-400
            focus:bg-white
            focus:ring-4
            focus:ring-orange-100
          "
        />
      </div>

      {/* Alphabet Navigation */}
      {!query && (
        <div className="flex flex-wrap justify-center gap-2">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#${letter}`}
              className="
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                py-2
                text-xs
                font-medium
                text-slate-600
                transition
                hover:border-orange-300
                hover:bg-orange-500
                hover:text-white
              "
            >
              {letter}
            </a>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            No Ingredients Found
          </h3>

          <p className="mt-2 text-slate-500">
            Try another keyword.
          </p>
        </div>
      )}

      {/* Ingredients */}
      <div className="space-y-10">
        {letters.map((letter) => (
          <section
            key={letter}
            id={letter}
            className="scroll-mt-28"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-white">
                {letter}
              </div>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {grouped[letter].map((ingredient) => (
                <Link
                  key={ingredient.idIngredient}
                  href={`/ingredients/${encodeURIComponent(
                    ingredient.strIngredient
                  )}`}
                  className="
                    group
                    rounded-xl
                    border
                    border-slate-100
                    bg-white
                    px-4
                    py-3
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:border-orange-200
                    hover:shadow-md
                  "
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="
                        truncate
                        text-sm
                        font-medium
                        text-slate-700
                        transition
                        group-hover:text-orange-500
                      "
                    >
                      {ingredient.strIngredient}
                    </span>

                    <span
                      className="
                        opacity-0
                        transition
                        group-hover:opacity-100
                        text-orange-500
                      "
                    >
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}