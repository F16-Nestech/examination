import TeacherHome from "pages/Teacher/Home/TeacherHome";
import StudentHome from "pages/Student/Home/StudentHome";
import Login from "components/Login/Login";

import { useSelector, useDispatch } from "react-redux";
import { createAxios } from "requests/request";
import { loginSuccess } from "reduxConf/authSlice";
import userRole from "config/userRole";

const Home = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  // create axios instance with Auth header
  createAxios(user, dispatch, loginSuccess);

  return !user ? (
    <Login />
  ) : user.role === userRole.ADMIN || user.role === userRole.TEACHER ? (
    <TeacherHome />
  ) : (
    <StudentHome />
  );
};

export default Home;
