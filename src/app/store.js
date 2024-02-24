import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
      serializableCheck: false, // If you want to disable serializableCheck as well
    });
  },
  reducer: {
    product: productReducer,
    user: userSlice,
  },
});
