import type { Recipe } from "../redux/features/recipesSlice";

function RecipeCard({
  recipe,
  onClick,
}: {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}) {
  return (
    <div
      className="border rounded p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => onClick(recipe)}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-32 object-cover rounded"
      />
      <h2 className="text-lg font-bold mt-2">{recipe.title}</h2>
    </div>
  );
}
export default RecipeCard;
