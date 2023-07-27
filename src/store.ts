import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.ts";
import chatReducer from "./slices/chatSlice.ts";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
