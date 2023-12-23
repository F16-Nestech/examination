import TeacherHome from "pages/Teacher/Home/TeacherHome";
import StudentHome from "pages/Student/Home/StudentHome";

const Home = () => {
  const user = { role: "teacher" };

  return user.role === "admin" || user.role === "teacher" ? (
    <TeacherHome />
  ) : (
    <StudentHome />
  );
};

export default Home;
