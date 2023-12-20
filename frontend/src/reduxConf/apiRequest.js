import request from "requests/request";
import { loginFail, loginStart, loginSuccess } from "./loginSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await request.post({
      entity: "auth/login",
      jsonData: { ...user },
    });
    dispatch(loginSuccess(res));
    // save token
    const { accessToken, refreshToken } = res.tokens;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    navigate("/");
  } catch (e) {
    dispatch(loginFail());
  }
};
