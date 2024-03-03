import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReudcer from "./userSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReudcer,
  },
});
