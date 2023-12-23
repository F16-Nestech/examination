import LoginForm from "forms/Login/LoginForm.js";
import logo from "assets/images/logo-school.png";

const Login = () => {
  return (
    <section className="flex flex-col items-center bg-gray-200 pb-8">
      <p className="my-6 font-bold md:text-xl">
        Trang kiểm tra Trường Trung học cơ sở An Phú
      </p>
      <div className="mb-8 w-20 md:w-80">
        <img src={logo} alt="logo-school" />
      </div>
      <LoginForm />
    </section>
  );
};

export default Login;
