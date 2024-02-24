import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../services/productService";
import { userService } from "../services/userSevice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  userInfo: null,
  accessToken: "",
  authenticated: false,
  isExitIntro: false,
  loadingIntro: false,
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
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
        state.authenticated = false;
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
      });
  },
});
export default userSlice.reducer;
