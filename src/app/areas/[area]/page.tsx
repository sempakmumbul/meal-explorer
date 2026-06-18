import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getMealsByArea } from "@/lib/api";
import { FaHome } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

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

      <main className="min-h-screen bg-white pt-16">

        <div className="mx-auto max-w-7xl px-6 py-10">

          {/* BREADCRUMB */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-slate-500">

            <Link href="/" className="flex items-center gap-1 hover:text-orange-500">
              <FaHome size={12} />
              Home
            </Link>

            <FiChevronRight />

            <Link href="/areas" className="hover:text-orange-500">
              Local Culinary
            </Link>

            <FiChevronRight />

            <span className="text-slate-900 font-medium">
              {area}
            </span>

          </nav>

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {area} Foods
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Explore popular dishes from {area}.
            </p>

            <div className="mt-3 text-xs text-slate-400">
              {meals.length} meals available
            </div>
          </div>

          {/* GRID */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {meals.map((meal: any) => (
              <Link
                key={meal.idMeal}
                href={`/meal/${meal.idMeal}`}
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
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="
                      h-52 w-full object-cover
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h2 className="text-base font-semibold text-slate-900 group-hover:text-orange-500">
                    {meal.strMeal}
                  </h2>
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