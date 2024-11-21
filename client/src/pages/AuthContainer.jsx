import { Link, Outlet } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const AuthContainer = () => {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#778DA9]">
        <Link to={"/"}>
          {/* Customize the icon appearance */}
          <IoHome
            className="m-5 text-[#3A405A] transition-colors duration-300"
            size={38} // Sets size to 48px
          />
        </Link>
        {/* Depending on route:
            /signup -> SignUpForm
            /login -> LoginForm */}
        <Outlet />
      </div>
    </>
  );
};

export default AuthContainer;
