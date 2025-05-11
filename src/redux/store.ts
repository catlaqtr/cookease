import recipesReducer from "./features/recipesSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
