import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/userSlice";
import authReducer from "../features/auth/authSlice";
const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
