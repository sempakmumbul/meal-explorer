const BASE_URL =
  "https://www.themealdb.com/api/json/v1/1";

export async function getMeals() {
  const response = await fetch(
    `${BASE_URL}/search.php?f=a`
  );

  const data = await response.json();

  return data.meals;
}

export async function getMealById(id: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const data = await response.json();

  return data.meals[0];
}

export async function searchMeals(query: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );

  const data = await response.json();

  return data.meals || [];
}

export async function getCategories() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  const data = await response.json();

  return data.categories;
}

export async function getMealsByCategory(category: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );

  const data = await response.json();

  return data.meals || [];
}

export async function getIngredients() {
  const response = await fetch(
    `${BASE_URL}/list.php?i=list`
  );

  const data = await response.json();

  return data.meals || [];
}

export async function getAreas() {
  const response = await fetch(
    `${BASE_URL}/list.php?a=list`
  );

  const data = await response.json();

  return data.meals || [];
}

export async function getMealsByArea(area: string) {
  const response = await fetch(
    `${BASE_URL}/filter.php?a=${area}`
  );

  const data = await response.json();

  return data.meals || [];
}

export async function getMealsByIngredient(ingredient: string) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );

  const data = await res.json();
  return data.meals || [];
}