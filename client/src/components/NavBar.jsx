import { Link } from "react-router-dom";
import { useUser } from "../services/context";

const SideNav = () => {
  const { user, isLoggedIn, logout } = useUser();

  return (
    <div className={`flex rounded-md border-2 border-black`}>
      <div className="font-anonymous flex items-center space-x-4 px-10 text-2xl font-light">
        <h2 className="transition-all hover:cursor-pointer hover:font-semibold">
          Overview
        </h2>
        <span className="h-5 w-0.5 bg-gray-700"></span>
        <h2 className="transition-all hover:cursor-pointer hover:font-semibold">
          Dashboard
        </h2>
        <span className="h-5 w-0.5 bg-gray-700"></span>
        <h2 className="transition-all hover:cursor-pointer hover:font-semibold">
          Statement Input
        </h2>
        <span className="h-5 w-0.5 bg-gray-700"></span>
        <h2 className="transition-all hover:cursor-pointer hover:font-semibold">
          New Budget
        </h2>
        <span className="h-5 w-0.5 bg-gray-700"></span>
        <h2 className="transition-all hover:cursor-pointer hover:font-semibold">
          Account
        </h2>
      </div>
    </div>
  );
};

export default SideNav;
