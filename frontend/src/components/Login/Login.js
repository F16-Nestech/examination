import LoginForm from "forms/Login/LoginForm.js";
import logo from "assets/images/logo-school.png";

const Login = () => {
  return (
    <section className="flex flex-col items-center bg-gray-200 pb-8">
      <p className="my-6">Trang kiểm tra Trường Trung học cơ sở An Phú</p>
      <div className="w-20 mb-8 md:w-80">
        <img src={logo} alt="logo-school" />
      </div>
      <LoginForm />
    </section>
  );
};

export default Login;
