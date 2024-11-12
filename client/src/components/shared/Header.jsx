import { Link } from "react-router-dom";
import LoginButton from "../auth/LoginButton";

const Header = () => {
  return (
    <div className="flex w-full items-center justify-center border-2">
      <h1 className="mb-5 mt-10 font-anonymous text-6xl font-bold">
        <Link to="/"> gobudget.</Link>
      </h1>
      {/* <UserTest /> */}
      <div className="mt-5">
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
