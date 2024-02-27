import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../services/productService";
import { userService } from "../services/userSevice";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
  userInfo: null,
  profile: null,
  accessToken: "",
  authenticated: false,
  isExitIntro: false,
  loadingIntro: false,
  accountId: "",
};
export const login = createAsyncThunk(
  "user/login",
  async ({ userName, passwordHash }, { rejectWithValue }) => {
    try {
      const response = await userService.login({ userName, passwordHash });
      console.log("<UserSlice>: " + response?.data);
      await AsyncStorage.setItem("ACCESS_TOKEN", response?.data?.accessToken);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem("ACCESS_TOKEN");

      return true;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loadAuthState = createAsyncThunk(
  "user/loadAuthState",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (accessToken) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const setExitIntro = createAsyncThunk(
  "user/setExitIntro",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem("Intro", "ádljalsdlkajslkd");

      return true;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const checkExitIntro = createAsyncThunk(
  "user/checkExitIntro",
  async (_, { rejectWithValue }) => {
    try {
      const data = await AsyncStorage.getItem("Intro");
      if (data) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (key, { rejectWithValue }) => {
    try {
      const response = await userService.getProfile(key);
      console.log("<UserSlice - updateProfile>: " + response?.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);



export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ key, City, Address, Height, Phone, Gender, Dob }, { rejectWithValue }) => {
    try {
      const response = await userService.updateProfile(key, City, Address, Height, Phone, Gender, Dob);
      console.log("<UserSlice - updateProfile>: " + response?.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
        state.authenticated = true;
        state.accountId = action.payload.accountId; // Assuming accountId is a property in the user data
        // Save userInfo to AsyncStorage
        AsyncStorage.setItem("USER_INFO", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userInfo = null;
        state.profile = null;
        state.loading = false;
        state.authenticated = false;
        state.accountId = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadAuthState.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload;
        state.userInfo = action.payload;
        // Load userInfo from AsyncStorage
        const userInfoFromStorage = AsyncStorage.getItem("USER_INFO");
        if (userInfoFromStorage) {
          state.userInfo = JSON.parse(userInfoFromStorage);
        }
      })
      .addCase(loadAuthState.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(setExitIntro.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setExitIntro.fulfilled, (state, action) => {
        state.loading = false;
        state.isExitIntro = action.payload;
      })
      .addCase(setExitIntro.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(checkExitIntro.pending, (state, action) => {
        state.loadingIntro = true;
      })
      .addCase(checkExitIntro.fulfilled, (state, action) => {
        state.loadingIntro = false;
        state.isExitIntro = action.payload;
      })
      .addCase(checkExitIntro.rejected, (state, action) => {
        state.loadingIntro = false;
      })
      .addCase(getProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.loading = true;
      })
      // .addCase(updateProfile.fulfilled, (state, action) => {
      //   state.userInfo = action.payload;
      //   state.profile = action.payload;
      //   state.loading = false;
      //   state.accountId = action.payload.accountId;

      //   console.log("Cập nhật thông tin người dùng thành công");

      //   // Assuming you want to navigate to 'Profile' after successful update
      //   // navigation.navigate(ROUTES.PROFILE);
      //   // Save userInfo to AsyncStorage
      //   AsyncStorage.setItem("USER_INFO", JSON.stringify(action.payload));
      // })
      // .addCase(updateProfile.fulfilled, async (state, action) => {
      //   try {
      //     if (action.payload) {
      //       // Return a new state object
      //       return {
      //         ...state,
      //         userInfo: action.payload,
      //         profile: action.payload,
      //         loading: false,
      //         accountId: action.payload.accountId,
      //       };
      //     }
      //   } catch (error) {
      //     console.error("Error updating profile:", error);
      //   }
      // })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          // Assuming that the data structure is nested under 'data' property
          const updatedProfileData = action.payload.data;

          // Update the state to indicate that the profile has been updated
          // state.userInfo = updatedProfileData;
          state.profile = updatedProfileData;
          state.loading = false;
          state.accountId = updatedProfileData.accountId;
          state.userProfile = action.payload;
        } else {
          console.error('Invalid or missing payload structure:', action.payload);
        }
      })



      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;

        // Check if action has an error property before accessing its message
        const errorMessage = action.error ? action.error.message : 'Unknown error';

        console.error("Cập nhật thông tin người dùng thất bại:", errorMessage);
      })
  },
});
export default userSlice.reducer;




