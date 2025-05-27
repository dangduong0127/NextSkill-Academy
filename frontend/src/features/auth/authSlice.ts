import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../utils/types";
import { checkAuth, logout } from "../../utils/axios";
interface AuthState {
  user: Partial<IUser> | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
};

const checkAuthThunk = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await checkAuth();
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const logoutThunk = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await logout();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthThunk.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

export { checkAuthThunk, logoutThunk };
export default authSlice.reducer;
