import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import userRole from "config/userRole";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const teacherMenu = [
    { link: "/manager/user", name: "Quản lý người dùng" },
    { link: "/manager/class", name: "Quản lý lớp học" },
    { link: "/manager/test", name: "Đề kiểm tra" },
    { link: "/manager/question-set", name: "Bộ câu hỏi" },
  ];
  const studentMenu = [{ link: "/student/test", name: "Đề kiểm tra" }];
  const menu =
    user.role === userRole.ADMIN || user.role === userRole.TEACHER
      ? teacherMenu
      : studentMenu;

  return (
    <nav
      className="absolute -mx-8 mt-16 hidden min-w-[160px] translate-y-1/2 flex-col bg-white text-black shadow-lg lg:static lg:m-0 lg:flex lg:min-w-0 lg:translate-y-0 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:bg-transparent lg:text-white lg:shadow-none"
      id="navbar"
    >
      <>
        {menu.map((item, idx) => (
          <Link
            to={item.link}
            className="p-2 hover:bg-gray-400 lg:rounded-xl lg:hover:bg-green-500"
            key={idx}
          >
            {item.name}
          </Link>
        ))}
      </>
    </nav>
  );
};

export default NavBar;
