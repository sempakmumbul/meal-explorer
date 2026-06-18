import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAreas } from "@/lib/api";
import { FaHome } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export default async function AreasPage() {
  const areas = await getAreas();

  const uniqueAreas = Array.from(
    new Map(
      areas.map((area: any) => [
        area.strArea,
        area,
      ])
    ).values()
  );

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
                Explore Food By Country
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-slate-500">
                Discover culinary traditions, recipes, and food cultures from countries around the world.
              </p>

              <div className="mt-5 inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-xs font-medium text-orange-600">
                {uniqueAreas.length} countries available
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
                Local Culinary
              </span>

            </nav>

          </div>

          {/* GRID */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {uniqueAreas.map((area: any) => (
              <Link
                key={area.strArea}
                href={`/areas/${area.strArea}`}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-100
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange-200
                  hover:shadow-lg
                "
              >
                {/* Glow Effect */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-orange-500
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-[0.04]
                  "
                />

                <div className="relative">
                  <h2
                    className="
                      text-lg
                      font-semibold
                      text-slate-900
                      transition
                      group-hover:text-orange-500
                    "
                  >
                    {area.strArea}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Explore local dishes and recipes
                  </p>

                  <div className="mt-4 text-sm font-medium text-orange-500 opacity-0 transition group-hover:opacity-100">
                    Explore Country →
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