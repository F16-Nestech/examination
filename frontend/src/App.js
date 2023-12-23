import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "components/Login/Login";
import Register from "components/Register/Register";
import Home from "pages/Home/Home";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import DoTest from "pages/Student/DoTest/DoTest";
import Class from "pages/Teacher/Class/Class";
import UserManager from "pages/Admin/UserManager/UserManager";
import Test from "pages/Teacher/Test/Test";
import TestSet from "pages/Teacher/QuestionSet/QuestionSet";

function App() {
  return (
    <Router>
      <Header />
      <div className="mx-auto min-h-[800px] max-w-screen-xl bg-gray-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student/do-test" element={<DoTest />} />
          <Route path="/manager/user" element={<UserManager />} />
          <Route path="/manager/class" element={<Class />} />
          <Route path="/manager/test" element={<Test />} />
          <Route path="/manager/test-set" element={<TestSet />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
