import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "components/Login/Login";
import Home from "pages/Home/Home";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import DoTest from "pages/Student/DoTest/DoTest";
import Class from "pages/Teacher/Class/Class";
import UserManager from "pages/Admin/UserManager/UserManager";
import Test from "pages/Teacher/Test/Test";
import QuestionSet from "pages/Teacher/QuestionSet/QuestionSet";

import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);

  return (
    <Router>
      {user ? <Header /> : null}
      <div className="mx-auto min-h-screen max-w-screen-xl bg-gray-200 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/do-test" element={<DoTest />} />
          <Route path="/manager/user" element={<UserManager />} />
          <Route path="/manager/class" element={<Class />} />
          <Route path="/manager/test" element={<Test />} />
          <Route path="/manager/question-set" element={<QuestionSet />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
