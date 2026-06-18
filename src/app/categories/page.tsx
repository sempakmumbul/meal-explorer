import { getCategories } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FaHome } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export default async function CategoriesPage() {
  const categories = await getCategories();

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
                Meal Categories
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-slate-500">
                Browse meals by category and discover recipes from around the world.
              </p>

              <div className="mt-5 inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-xs font-medium text-orange-600">
                {categories.length} categories available
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
                Foods
              </span>

            </nav>

          </div>

          {/* GRID */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {categories.map((category: any) => (
              <Link
                href={`/categories/${category.strCategory}`}
                key={category.idCategory}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-100
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange-200
                  hover:shadow-lg
                "
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="
                      h-52
                      w-full
                      object-cover
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h2
                    className="
                      text-lg
                      font-semibold
                      text-slate-900
                      transition
                      group-hover:text-orange-500
                    "
                  >
                    {category.strCategory}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                    {category.strCategoryDescription}
                  </p>

                  <div className="mt-4 text-sm font-medium text-orange-500 opacity-0 transition group-hover:opacity-100">
                    Explore Category →
                  </div>

                </div>
              </Link>
            ))}

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}