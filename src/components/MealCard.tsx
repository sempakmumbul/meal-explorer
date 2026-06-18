import { Meal } from "@/types/meal";
import Link from "next/link";

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <Link
      href={`/meal/${meal.idMeal}`}
      className="
        group
        block
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
        <h2 className="text-base font-semibold text-slate-900 transition group-hover:text-orange-500">
          {meal.strMeal}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {meal.strCategory}
        </p>
      </div>
    </Link>
  );
}