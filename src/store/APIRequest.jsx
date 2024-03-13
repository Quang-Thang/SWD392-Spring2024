import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";

const baseUrl = "https://swdprojectapi.azurewebsites.net/api";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://swdprojectapi.azurewebsites.net/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    console.log("User data from api request: ", res.data);

    navigate("/admin");
  } catch (error) {
    dispatch(loginFailed());
    console.log("error: ", error.response.data);
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post(`${baseUrl}/auth/register`, user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get(
      "https://swdprojectapi.azurewebsites.net/api/members",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersFailed());
  }
};
