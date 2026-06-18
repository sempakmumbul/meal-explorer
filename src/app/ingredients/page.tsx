import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getIngredients } from "@/lib/api";
import IngredientsList from "@/components/IngredientsList";

export default async function IngredientsPage() {
  const ingredients = await getIngredients();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      {/* IMPORTANT: offset fixed navbar */}
      <main className="flex-1 pt-16">
        
        {/* HEADER (more minimal + modern) */}
        <section className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-8">
            
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-500">
                Database
              </p>

              <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Ingredients Explorer
              </h1>

              <p className="max-w-2xl text-sm text-slate-500">
                Search, browse, and explore ingredients from TheMealDB dataset.
              </p>
            </div>

          </div>
        </section>

        {/* CONTENT WRAPPER */}
        <section className="mx-auto max-w-7xl px-6 py-8">

          {/* TOP BAR (clean meta info) */}
          <div className="mb-6 flex items-center justify-between">
            
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-semibold text-slate-900">
                Ingredients List
              </h2>
              <p className="text-xs text-slate-500">
                Use search or alphabet navigation to filter data
              </p>
            </div>

            <div className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500 md:block">
              {ingredients.length} items
            </div>

          </div>

          {/* LIST */}
          <IngredientsList ingredients={ingredients} />

        </section>
      </main>

      <Footer />
    </div>
  );
}