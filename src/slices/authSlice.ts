import { createSlice } from "@reduxjs/toolkit";

interface authState {
  token: string;
  userId: string;
  isAuth: boolean;
  email: string;
}

interface payload {
  token: string;
  userId: string;
  email: string;
}

const initialState: authState = {
  token: "",
  userId: "",
  isAuth: false,
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: { payload: payload }) => {
      const { token, userId, email } = action.payload;
      state.isAuth = true;
      state.token = token;
      state.userId = userId;
      state.email = email;
    },
    signOut: (state) => {
      (state.token = ""), (state.userId = ""), (state.isAuth = false);
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
