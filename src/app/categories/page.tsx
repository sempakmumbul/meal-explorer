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

      <main className="min-h-screen bg-white pt-16">

        <div className="mx-auto max-w-7xl px-6 py-10">

          {/* BREADCRUMB (NEW - like your screenshot style) */}
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-slate-500">

            <Link href="/" className="flex items-center gap-1 hover:text-orange-500">
              <FaHome size={12} />
              Home
            </Link>

            <FiChevronRight />

            <span className="hover:text-orange-500">
              Categories
            </span>

            <FiChevronRight />

            <span className="text-slate-900 font-medium">
              All Categories
            </span>

          </nav>

          {/* HEADER */}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Meal Categories
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Browse meals by category and discover recipes from around the world.
          </p>

          {/* GRID */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {categories.map((category: any) => (
              <Link
                href={`/categories/${category.strCategory}`}
                key={category.idCategory}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border border-slate-100
                  bg-white
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                  hover:border-orange-200
                "
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="
                      h-52 w-full object-cover
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-slate-900 group-hover:text-orange-500">
                    {category.strCategory}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-3">
                    {category.strCategoryDescription}
                  </p>
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