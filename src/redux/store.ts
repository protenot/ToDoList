import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { initialState } from "./state";

export const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
});
