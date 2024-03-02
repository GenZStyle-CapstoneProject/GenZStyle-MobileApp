import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import userSlice from "../features/userSlice";
import activePostReducer from "../app/ActivePost/slice";
import commentPostReducer from "../app/CommentPost/slice";
import addCommentPostReducer from "../app/AddComment/slice";
import packageRegisterReducer from "../app/PackageRegister/slice";

import postReducer from "../features/postSlice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });
  },
  reducer: {
    post: postReducer,
    user: userSlice,
    activePost: activePostReducer,
    commnentPost: commentPostReducer,
    addCommentPost: addCommentPostReducer,
    packageRegister: packageRegisterReducer,
  },
});
