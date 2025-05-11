import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";
import { useRef } from "react";

function App() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">CookEase</h1>
      <SearchBar inputRef={searchInputRef} />
      <RecipeList searchInputRef={searchInputRef} />
    </main>
  );
}
export default App;
