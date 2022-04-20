import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../firebase/userSlice";

export default configureStore({
  reducer: {
    firebase: userReducer,
  },
});
