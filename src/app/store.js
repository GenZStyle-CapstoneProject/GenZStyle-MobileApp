import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
      serializableCheck: false, // If you want to disable serializableCheck as well
    });
  },
  reducer: {
    product: productReducer,
  },
});
