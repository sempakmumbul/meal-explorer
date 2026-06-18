import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-pink-50" />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Discover Delicious Meals
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          Explore curated recipes from around the world, learn new cooking ideas,
          and find your next favorite meal in minutes.
        </p>

        <div className="mx-auto max-w-2xl">
          <SearchBar />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <span>🍽️ 300+ Recipes</span>
          <span>🌎 Worldwide Meals</span>
          <span>📺 Video Tutorials</span>
        </div>
      </div>
    </section>
  );
}