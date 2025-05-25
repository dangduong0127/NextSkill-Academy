import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { IUser } from "../../utils/types";
import { deleteUser, getAllUsers, updateUser } from "../../utils/axios";
interface UserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const res = await getAllUsers();
      const data = res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async (
    { userId, data }: { userId: string; data: Partial<IUser> },
    thunkAPI
  ) => {
    try {
      const res = await updateUser(userId, data);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, thunkAPI) => {
    try {
      await deleteUser(userId);
      return userId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.loading = false;
          state.users = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAllUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.loading = false;
          const index = state.users.findIndex(
            (u) => u._id === action.payload._id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        }
      )
      .addCase(updateUserThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteUserThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.users = state.users.filter((u) => u._id !== action.payload);
        }
      )
      .addCase(deleteUserThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export { fetchAllUsers, updateUserThunk, deleteUserThunk };
export default userSlice.reducer;
