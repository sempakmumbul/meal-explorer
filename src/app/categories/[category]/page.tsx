import Navbar from "@/components/Navbar";
import MealCard from "@/components/MealCard";
import { getMealsByCategory } from "@/lib/api";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const meals = await getMealsByCategory(category);

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
                Category
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {category}
              </h1>

              <p className="mt-3 text-sm text-slate-500">
                Explore all meals available in the{" "}
                <span className="font-medium text-slate-700">
                  {category}
                </span>{" "}
                category.
              </p>

              <div className="mt-5 inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-xs font-medium text-orange-600">
                {meals.length} meals found
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
                href="/categories"
                className="transition hover:text-orange-500"
              >
                Foods
              </Link>

              <FiChevronRight size={14} />

              <span className="font-medium text-slate-900">
                {category}
              </span>

            </nav>
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