import logo from "assets/images/logo-school.png";
import notificationIcon from "assets/images/notification-icon.svg";
import userIcon from "assets/images/user-icon.svg";
import barsIcon from "assets/images/bars-icon.svg";
import logoutIcon from "assets/images/logout.svg";
import NavBar from "components/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "reduxConf/apiRequest";
import { useEffect } from "react";

const Header = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch, navigate);
  };
  const handleClickUser = () => {
    const dropdown = document.getElementById("drop-menu");
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
    } else {
      dropdown.classList.add("hidden");
    }
  };
  const handleClickMenu = () => {
    const navbar = document.getElementById("navbar");
    if (navbar.classList.contains("hidden")) {
      navbar.classList.replace("hidden", "flex");
    } else {
      navbar.classList.replace("flex", "hidden");
    }
  };
  useEffect(() => {
    const onClickHandler = (event) => {
      if (!event.target.matches(".drop-btn")) {
        const dropdown = document.getElementById("drop-menu");
        if (!dropdown.classList.contains("hidden")) {
          dropdown.classList.add("hidden");
        }
      }
      if (!event.target.matches(".menu-btn")) {
        const navbar = document.getElementById("navbar");
        if (!navbar.classList.contains("hidden")) {
          navbar.classList.replace("flex", "hidden");
        }
      }
    };
    window.addEventListener("click", onClickHandler);
    return () => {
      window.removeEventListener("click", onClickHandler);
    };
  }, []);

  return user ? (
    <section className="fixed left-0 top-0 z-50 flex h-16 w-full flex-row items-center justify-between bg-gradient-to-b from-cyan-500 to-blue-500 px-8 text-white lg:px-32">
      <div
        className="menu-btn flex w-28 pl-4 lg:hidden"
        onClick={handleClickMenu}
      >
        <img src={barsIcon} alt="menu" className="menu-btn" />
      </div>
      <Link className="align-center flex w-10 items-center" to="/">
        <img src={logo} alt="logo-school" />
      </Link>

      {/* Nav */}
      <NavBar />

      {/* User info and notification */}
      <div className="flex h-full flex-row items-center gap-4">
        <div className="hidden text-yellow-200 lg:flex">{user?.name}</div>
        <div className="flex h-full w-12 items-center justify-center">
          <img
            src={notificationIcon}
            alt="notification-icon"
            className="drop-btn cursor-pointer"
          />
        </div>
        <div
          className="drop-btn relative flex h-12 w-12 items-center justify-center"
          onClick={handleClickUser}
        >
          <img
            src={userIcon}
            alt="user-icon"
            className="drop-btn cursor-pointer"
          />
          <div
            className="absolute ml-32 mt-16 hidden min-w-[160px] -translate-x-1/2 translate-y-1/2 cursor-pointer bg-white p-4 text-black shadow-lg hover:bg-gray-400"
            id="drop-menu"
          >
            <div
              className="flex items-center justify-between"
              onClick={handleLogout}
            >
              <img src={logoutIcon} alt="logout" />
              <div>Logout</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default Header;
