import type { Recipe } from "../redux/features/recipesSlice";

type RecipeCardProps = {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  isActive?: boolean;
};

function RecipeCard({ recipe, onClick, isActive }: RecipeCardProps) {
  return (
    <div
      onClick={() => onClick(recipe)}
      className={`bg-white border rounded shadow-md p-4 cursor-pointer 
    transition-transform duration-200 hover:shadow-xl hover:scale-[1.02] 
    ${isActive ? "ring-2 ring-blue-500 ring-offset-2 transition-all" : ""}`}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-32 object-cover rounded"
      />
      <h2 className="text-lg sm:text-base font-bold mt-2">{recipe.title}</h2>
    </div>
  );
}
export default RecipeCard;
