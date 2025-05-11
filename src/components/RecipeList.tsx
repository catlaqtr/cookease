import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import RecipeCard from "./RecipeCard";
import Modal from "./Modal";
import { AppDispatch } from "../redux/store";
import { fetchRecipeDetails } from "../redux/features/recipesSlice";
import { useState } from "react";
import { Recipe } from "../redux/features/recipesSlice";

function RecipeList() {
  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.recipes
  );
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { selectedRecipeDetails, loadingDetails, detailsError } = useSelector(
    (state: RootState) => state.recipes
  );

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <p>No recipes found. Please try a different search.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={(recipe) => {
              setSelectedRecipe(recipe);
              dispatch(fetchRecipeDetails(recipe.id));
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>
      {selectedRecipe && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {loadingDetails && <p>Loading...</p>}
          {detailsError && <p className="text-red-500">{detailsError}</p>}
          {selectedRecipeDetails && (
            <div>
              <h2 className="text-lg font-bold">
                {selectedRecipeDetails.title}
              </h2>
              <img
                src={selectedRecipeDetails.image}
                alt={selectedRecipeDetails.title}
                className="w-full h-32 object-cover rounded"
              />
              <p
                className="mt-2"
                dangerouslySetInnerHTML={{
                  __html: selectedRecipeDetails.summary,
                }}
              ></p>

              <h3 className="font-bold">Ingredients:</h3>
              <ul>
                {selectedRecipeDetails.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
export default RecipeList;
