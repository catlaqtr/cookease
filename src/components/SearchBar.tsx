import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery, fetchRecipes } from "../redux/features/recipesSlice";
import type { AppDispatch } from "../redux/store";

function SearchBar({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [query, setQueryState] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = () => {
    if (!query.trim()) return;
    dispatch(setQuery(query));
    dispatch(fetchRecipes(query));
    setQueryState("");
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQueryState(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        placeholder="e.g. chicken, vegan, dessert…"
        autoFocus
        className="border border-gray-300 rounded-l px-4 py-2 w-1/2"
      />
      <button
        onClick={handleSearch}
        disabled={!query.trim()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
