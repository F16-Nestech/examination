import { useState } from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [user, setUSer] = useState({ name: "Tinh", role: "admin" });
  return (
    <nav className="flex flex-row items-center justify-between gap-6 text-white">
      {user.role === "admin" ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/manager/user">Quản lý người dùng</Link>
          <Link to="/manager/class">Quản lý lớp học</Link>
          <Link to="/manager/test">Đề kiểm tra</Link>
          <Link to="/manager/test-set">Bộ câu hỏi</Link>
        </>
      ) : user.role === "teacher" ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/manager/user">Quản lý học sinh</Link>
          <Link to="/manager/class">Quản lý lớp học</Link>
          <Link to="/manager/test">Đề kiểm tra</Link>
          <Link to="/manager/test-set">Bộ câu hỏi</Link>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/student/test">Đề kiểm tra</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
