import { Link } from "react-router-dom";
import LoginButton from "../auth/LoginButton";

const Header = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <h1 className="my-5 font-anonymous text-6xl font-bold">
        <Link to="/"> gobudget.</Link>
      </h1>
      {/* <UserTest /> */}
      <div className="mb-1">
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
