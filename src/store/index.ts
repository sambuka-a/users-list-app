import { configureStore } from "@reduxjs/toolkit"
import usersReducer from './UsersSlice'

export const store = configureStore({
  reducer: {
    app: usersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;