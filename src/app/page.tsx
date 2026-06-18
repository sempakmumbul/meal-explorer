import Hero from "@/components/Hero";
import MealCard from "@/components/MealCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getMeals, searchMeals } from "@/lib/api";
import { Meal } from "@/types/meal";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  const meals: Meal[] = search
    ? await searchMeals(search)
    : await getMeals();

  const isSearching = Boolean(search?.trim());
  const hasResults = meals.length > 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 pt-16">

        {/* HERO */}
        <Hero />

        {/* CONTENT SECTION */}
        <section 
        id="results"
        className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12">

            {/* HEADER */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {isSearching ? "Search Results" : "Browse Meals"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {isSearching
                    ? "We found meals matching your search."
                    : "Discover meals from various cuisines around the world."}
                </p>
              </div>

              {isSearching && (
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs text-slate-600 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-orange-400" />
                  Searching:{" "}
                  <span className="font-medium text-slate-800">
                    {search}
                  </span>
                </div>
              )}
            </div>

            {/* EMPTY STATE */}
            {!hasResults ? (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 py-16 text-center">
                <h3 className="text-xl font-semibold text-slate-700">
                  No meals found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try a different keyword or explore available meals.
                </p>
              </div>
            ) : (
              <>
                {/* RESULT META */}
                <div className="mb-5 flex items-center justify-between text-xs text-slate-500">
                  <p>
                    Showing{" "}
                    <span className="font-semibold text-slate-700">
                      {meals.length}
                    </span>{" "}
                    results
                  </p>

                  {isSearching && (
                    <p className="hidden sm:block">
                      Refine your search for better results
                    </p>
                  )}
                </div>

                {/* GRID */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {meals.map((meal) => (
                    <MealCard key={meal.idMeal} meal={meal} />
                  ))}
                </div>
              </>
            )}

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}