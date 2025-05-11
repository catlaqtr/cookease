import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">CookEase</h1>
      <SearchBar />
      <RecipeList />
    </main>
  );
}
export default App;
