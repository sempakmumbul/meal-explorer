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

      <main className="min-h-screen bg-white pt-16">

        <div className="mx-auto max-w-7xl px-6 py-10">

          {/* BREADCRUMB (CONSISTENT SYSTEM) */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-slate-500">

            <Link href="/" className="flex items-center gap-1 hover:text-orange-500">
              <FaHome size={12} />
              Home
            </Link>

            <FiChevronRight />

            <Link href="/categories" className="hover:text-orange-500">
              Categories
            </Link>

            <FiChevronRight />

            <span className="text-slate-900 font-medium">
              {category}
            </span>

          </nav>

          {/* TITLE */}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {category}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Meals in the {category} category
          </p>

          {/* META */}
          <div className="mt-6 text-xs text-slate-400">
            {meals.length} meals found
          </div>

          {/* GRID */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {meals.map((meal: any) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}