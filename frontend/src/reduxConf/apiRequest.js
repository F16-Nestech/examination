import request from 'requests/request';
import { loginFail, loginStart, loginSuccess } from './loginSlice';

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await request.post({
      entity: 'auth/login',
      jsonData: { ...user },
    });
    dispatch(loginSuccess(res.data));
    navigate('/');
  } catch (e) {
    dispatch(loginFail());
  }
};
