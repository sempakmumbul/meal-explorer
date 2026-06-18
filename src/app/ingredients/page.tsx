import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IngredientsList from "@/components/IngredientsList";
import { getIngredients } from "@/lib/api";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export default async function IngredientsPage() {
  const ingredients = await getIngredients();

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
                Food Database
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Ingredients
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-slate-500">
                Search, browse, and explore ingredients.
              </p>

              <div className="mt-5 inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-xs font-medium text-orange-600">
                {ingredients.length} ingredients available
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

              <span className="font-medium text-slate-900">
                Ingredients
              </span>

            </nav>

          </div>

          {/* INGREDIENTS */}
          <IngredientsList ingredients={ingredients} />

        </div>

      </main>

      <Footer />
    </>
  );
}