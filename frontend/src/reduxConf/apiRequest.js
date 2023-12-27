import axios from "axios";
import * as authAction from "./authSlice";
import * as userAction from "./userSlice";
import request from "requests/request";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(authAction.loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(authAction.loginSuccess(res.data.user));
    navigate("/");
  } catch {
    dispatch(authAction.loginFailed());
  }
};

export const getAllUsers = async (dispatch) => {
  dispatch(userAction.getUsersStart());
  try {
    const res = await request.get("/users/");
    dispatch(userAction.getUsersSuccess(res.data));
  } catch (err) {
    dispatch(userAction.getUsersFailed());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(userAction.deleteUserStart());
  try {
    console.log(id);
    const res = await request.delete("/users/");
    dispatch(userAction.deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(userAction.deleteUserFailed(err.response.data));
  }
};

export const logout = async (dispatch, navigate) => {
  dispatch(authAction.logoutStart());
  try {
    dispatch(authAction.logoutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(authAction.logoutFailed());
  }
};
