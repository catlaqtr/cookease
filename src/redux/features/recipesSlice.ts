import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Ingredient {
  id: number;
  original: string;
}

type Recipe = {
  id: number;
  title: string;
  image: string;
  summary: string;
  extendedIngredients: Ingredient[];
};

type RecipesState = {
  recipes: Recipe[];
  query: string;
  loading: boolean;
  error: string | null;
  selectedRecipeDetails: Recipe | null;
  loadingDetails: boolean;
  detailsError: string | null;
};

const initialState: RecipesState = {
  recipes: [],
  query: "",
  loading: false,
  error: null,
  selectedRecipeDetails: null,
  loadingDetails: false,
  detailsError: null,
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (query: string) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=71b8c5c867ef4f4e92d07ce49d9503be`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();
    return data.results;
  }
);

export const fetchRecipeDetails = createAsyncThunk(
  "recipes/fetchRecipeDetails",
  async (id: number) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=71b8c5c867ef4f4e92d07ce49d9503be`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recipe details");
    }
    const data = await response.json();
    return data;
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = false;
          state.recipes = action.payload;
        }
      )
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recipes";
      })
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.loadingDetails = true;
        state.detailsError = null;
      })
      .addCase(
        fetchRecipeDetails.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          state.loadingDetails = false;
          state.selectedRecipeDetails = action.payload;
        }
      )
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.loadingDetails = false;
        state.detailsError =
          action.error.message || "Failed to fetch recipe details";
      });
  },
});

export const { setQuery } = recipesSlice.actions;
export default recipesSlice.reducer;
export type { Recipe };
