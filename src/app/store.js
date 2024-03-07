import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import userSlice from "../features/userSlice";
import activePostReducer from "../app/ActivePost/slice";
import commentPostReducer from "../app/CommentPost/slice";
import addCommentPostReducer from "../app/AddComment/slice";
import packageRegisterReducer from "../app/PackageRegister/slice";
import listFollowReducer from "../app/ListFollow/slice"
import postReducer from "../features/postSlice";
import likePostReducer from "../app/LikePost/slice"
import followFriendReducer from "../app/Button/slice"
import MyPostSliceReducer from "../app/MyPost/slice"
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
    listFollow: listFollowReducer,
    likePost: likePostReducer,
    followFriend: followFriendReducer,
    fetchMyPost: MyPostSliceReducer,
  },
});
