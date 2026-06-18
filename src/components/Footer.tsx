export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* BRAND */}
        <div className="text-center">

          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            Meal Explorer
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Explore recipes from around the world with a clean and simple experience.
          </p>

        </div>

        {/* DIVIDER */}
        <div className="my-6 border-t border-slate-100" />

        {/* META INFO */}
        <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">

          <p className="text-xs text-slate-400">
            Powered by TheMealDB API
          </p>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Muhammad Avid Maulana
          </p>

        </div>

      </div>

    </footer>
  );
}