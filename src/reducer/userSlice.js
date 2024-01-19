import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // userName: "",
    userID: "",
    isLoginLoading: false,
    isLogin: null,
  },
  reducers: {
    //Login성공시
    loginUser: (state, action) => {
      // state.userName = action.payload.userName;
      state.userID = action.payload.userID;
      return state;
    },
    clearUser: (state) => {
      // state.userName = '';
      state.userID = "";
      return state;
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
