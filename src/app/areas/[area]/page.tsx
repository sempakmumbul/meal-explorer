import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getMealsByArea } from "@/lib/api";
import { FaHome } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import MealCard from "@/components/MealCard";

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;

  const meals = await getMealsByArea(area);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 pt-16">
        <div className="mx-auto max-w-7xl px-6 py-10">

          {/* HEADER */}
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

            {/* LEFT */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                Local Culinary
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {area} Foods
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-slate-500">
                Explore traditional dishes and popular recipes from{" "}
                <span className="font-medium text-slate-700">
                  {area}
                </span>
                .
              </p>

              <div className="mt-5 inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-xs font-medium text-orange-600">
                {meals.length} meals available
              </div>
            </div>

            {/* BREADCRUMB */}
            <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500">

              <Link
                href="/"
                className="flex items-center gap-1 transition hover:text-orange-500"
              >
                <FaHome size={12} />
                Home
              </Link>

              <FiChevronRight size={14} />

              <Link
                href="/areas"
                className="transition hover:text-orange-500"
              >
                Local Culinary
              </Link>

              <FiChevronRight size={14} />

              <span className="font-medium text-slate-900">
                {area}
              </span>

            </nav>

          </div>

          {/* SECTION HEADER */}
          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-lg font-semibold text-slate-900">
              Recipes
            </h2>

            <span className="text-sm text-slate-500">
              {meals.length} results found
            </span>

          </div>

          {/* GRID */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {meals.map((meal: any) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
              />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}