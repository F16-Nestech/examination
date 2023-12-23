import logo from "assets/images/logo-school.png";
import notificationIcon from "assets/images/notification-icon.svg";
import userIcon from "assets/images/user-icon.svg";
import NavBar from "components/NavBar/NavBar";
import { Link } from "react-router-dom";
const Header = () => {
  // const user = null;
  const user = {
    name: "Doan Quang Tinh",
    role: "admin",
  };
  return user ? (
    <section className="flex flex-row items-center justify-between bg-gradient-to-b from-cyan-500 to-blue-500 px-8 py-4 text-white">
      <Link className="w-8" to="/">
        <img src={logo} alt="logo-school" />
      </Link>

      {/* Nav */}
      <NavBar />

      {/* User info and notification */}
      <div className="flex flex-row items-center justify-between gap-6">
        <div>{user.name}</div>
        <div>
          <img src={notificationIcon} alt="notification-icon" />
        </div>
        <div>
          <img src={userIcon} alt="user-icon" />
        </div>
      </div>
    </section>
  ) : null;
};

export default Header;
