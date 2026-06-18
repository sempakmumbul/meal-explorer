import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAreas } from "@/lib/api";
import { FaHome } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export default async function AreasPage() {
  const areas = await getAreas();

  // ✅ FIX DUPLICATE KEY ISSUE
  const uniqueAreas = Array.from(
    new Map(areas.map((a: any) => [a.strArea, a])).values()
  );

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

            <span className="text-slate-900 font-medium">
              Local Culinary
            </span>

          </nav>

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Explore Food By Country
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Discover culinary traditions from around the world.
            </p>

            <div className="mt-4 text-xs text-slate-400">
              {uniqueAreas.length} countries available
            </div>
          </div>

          {/* GRID */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {uniqueAreas.map((area: any) => (
              <Link
                key={area.strArea}
                href={`/areas/${area.strArea}`}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border border-slate-100
                  bg-white
                  p-6
                  text-center
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                  hover:border-orange-200
                "
              >

                {/* subtle glow */}
                <div className="
                  absolute inset-0
                  bg-orange-500
                  opacity-0
                  transition-opacity duration-300
                  group-hover:opacity-[0.04]
                " />

                {/* CONTENT */}
                <h2 className="
                  relative text-lg font-semibold text-slate-900
                  transition
                  group-hover:text-orange-500
                ">
                  {area.strArea}
                </h2>

                <p className="relative mt-2 text-xs text-slate-500">
                  Explore dishes
                </p>

              </Link>
            ))}

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}