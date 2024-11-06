import { Link, Outlet } from "react-router-dom";

const AuthContainer = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#778DA9]">
        <Link to={"/"}>home</Link>
        {/* 
        Depending on route: 
        /auth/signup -> SignUpForm
        /auth/login -> LoginForm
        */}
        <Outlet />
      </div>
    </>
  );
};

export default AuthContainer;
