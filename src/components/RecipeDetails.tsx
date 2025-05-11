import { Recipe } from "../redux/features/recipesSlice";
type RecipeDetailsProps = {
  recipe: Recipe;
};

function RecipeDetails({ recipe }: RecipeDetailsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full md:w-1/2 h-48 object-cover rounded"
      />
      <div className="flex-1">
        <h2 id="modal-title" className="text-xl font-bold mb-2">
          {recipe.title}
        </h2>

        <p
          className="mb-4 text-gray-700"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
        <h3 className="font-semibold mb-1">Ingredients:</h3>
        <ul className="list-disc list-inside space-y-1">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeDetails;
