import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { getMealsByIngredient } from "@/lib/api";
import MealCard from "@/components/MealCard";

export default async function IngredientDetailPage({
  params,
}: {
  params: Promise<{ ingredient: string }>;
}) {
  const { ingredient } = await params;

  const meals = await getMealsByIngredient(ingredient);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-16">

        <div className="mx-auto max-w-7xl px-6 py-10">

          {/* BREADCRUMB */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-slate-500">

            <Link href="/" className="flex items-center gap-1 hover:text-orange-500">
              <FaHome size={12} />
              Home
            </Link>

            <FiChevronRight />

            <Link href="/ingredients" className="hover:text-orange-500">
              Ingredients
            </Link>

            <FiChevronRight />

            <span className="text-slate-900 font-medium">
              {ingredient}
            </span>

          </nav>

          {/* HERO */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {ingredient}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Recipes that use {ingredient} as a main ingredient
            </p>

            <div className="mt-4 text-xs text-slate-400">
              {meals.length} recipes found
            </div>
          </div>

          {/* GRID */}
          {meals.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 py-16 text-center">
              <p className="text-sm text-slate-500">
                No meals found for this ingredient.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {meals.map((meal: any) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}