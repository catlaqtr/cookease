import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/recipesSlice";
import { useState } from "react";
import { fetchRecipes } from "../redux/features/recipesSlice";
import type { AppDispatch } from "../redux/store";
function SearchBar() {
  const [query, setQueryState] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex items-center justify-center mt-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQueryState(e.target.value)}
        placeholder="Search for recipes..."
        className="border border-gray-300 rounded-l px-4 py-2 w-1/2"
      />
      <button
        onClick={() => {
          dispatch(setQuery(query));
          dispatch(fetchRecipes(query));
          setQueryState("");
        }}
        className="bg-blue-500 text-white rounded-r px-4 py-2"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
