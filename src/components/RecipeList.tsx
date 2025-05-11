import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import RecipeCard from "./RecipeCard";
import Modal from "./Modal";
import { AppDispatch } from "../redux/store";
import { fetchRecipeDetails } from "../redux/features/recipesSlice";
import { useState } from "react";
import type { Recipe } from "../redux/features/recipesSlice";
import RecipeDetails from "./RecipeDetails";
import { RefObject } from "react";

function RecipeList({
  searchInputRef,
}: {
  searchInputRef: RefObject<HTMLInputElement | null>;
}) {
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
      {loading && (
        <div className="flex items-center justify-center h-64 w-full">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <div className="text-center mt-12 text-gray-500">
          <p className="text-2xl mb-2">😕 No recipes found</p>
          <p className="text-sm">
            Try searching for something else like{" "}
            <span className="italic text-blue-600">chicken</span> or{" "}
            <span className="italic text-blue-600">pasta</span>.
          </p>
        </div>
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
            isActive={selectedRecipe?.id === recipe.id}
          />
        ))}
      </div>
      {selectedRecipe && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            searchInputRef.current?.focus();
          }}
        >
          {loadingDetails && (
            <div className="flex items-center justify-center h-64 w-full">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {detailsError && <p className="text-red-500">{detailsError}</p>}
          {selectedRecipeDetails && (
            <RecipeDetails recipe={selectedRecipeDetails} />
          )}
        </Modal>
      )}
    </div>
  );
}
export default RecipeList;
