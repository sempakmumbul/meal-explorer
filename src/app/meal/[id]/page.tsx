import { getMealById } from "@/lib/api";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Navbar from "@/components/Navbar";


export default async function MealDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const meal = await getMealById(id);
const youtubeId = meal.strYoutube
  ? meal.strYoutube.split("v=")[1]
  : null;
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <>
        <Navbar />
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
       <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm">
  <Link
    href="/"
    className="flex items-center gap-2 text-slate-600 hover:text-orange-500"
  >
    <FaHome size={14} />
    <span>Home</span>
  </Link>

  <FiChevronRight className="text-slate-400" />

  <Link
    href="/categories"
    className="text-slate-600 hover:text-orange-500"
  >
    Categories
  </Link>

  <FiChevronRight className="text-slate-400" />

  <span className="text-slate-600">
    {meal.strCategory}
  </span>

  <FiChevronRight className="text-slate-400" />

  <span className="font-medium text-slate-900">
    {meal.strMeal}
  </span>
</nav>

        {/* Title */}
        <h1 className="mb-4 text-5xl font-bold text-slate-900">
          {meal.strMeal}
        </h1>

        {/* Badge */}
        <div className="mb-10 flex flex-wrap gap-3">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            {meal.strCategory}
          </span>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            {meal.strArea}
          </span>
        </div>

        {/* Main Content */}
        <section className="items-start grid gap-10 lg:grid-cols-2">
          {/* Image */}
         <div className="lg:sticky lg:top-24 h-fit">
  <img
    src={meal.strMealThumb}
    alt={meal.strMeal}
    className="w-full rounded-3xl object-cover shadow-xl"
  />
</div>

          {/* Instructions */}
          <div className="rounded-3xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">
              Instructions
            </h2>

            <p className="leading-8 text-slate-600">
              {meal.strInstructions}
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="mt-14">
  <h2 className="mb-6 text-3xl font-bold text-slate-900">
    Ingredients
  </h2>

  <div className="flex flex-wrap gap-3">
    {ingredients.map((item, index) => (
      <div
        key={index}
        className="
          group
          relative
          overflow-hidden
          rounded-full
          border border-slate-200
          bg-white
          px-5 py-2
          shadow-sm
          transition-all duration-200
          hover:-translate-y-0.5
          hover:border-orange-200
          hover:shadow-md
        "
      >
        <span className="text-sm font-medium text-slate-700 group-hover:text-orange-500">
          {item}
        </span>

        {/* subtle glow effect */}
        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-10 bg-orange-400" />
      </div>
    ))}
  </div>
</section>

        {/* Youtube Tutorial */}
{youtubeId && (
  <section className="mt-14">
    <h2 className="mb-6 text-3xl font-bold text-slate-900">
      Video Tutorial
    </h2>

    <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-md">
      <iframe
        className="aspect-video w-full rounded-2xl"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={meal.strMeal}
        allowFullScreen
      />
    </div>
  </section>
)
}

      </div>
      
    </main>
    </>
  );
}