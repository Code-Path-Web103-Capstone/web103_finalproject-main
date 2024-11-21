import { useUser } from "../../services/context";
import NavItem from "./NavItem";

const NavBar = () => {
  const { user, isLoggedIn, logout } = useUser();

  return (
    <div className="mb-5 flex w-auto justify-center rounded-md border-2 border-black">
      <div className="flex items-center space-x-4 px-10 font-anonymous text-2xl font-light">
        <div className="flex items-center space-x-2">
          <NavItem route="/dashboard" text="Dashboard" className="w-[9ch]" />
          <span className="h-5 w-0.5 bg-gray-700"></span>
        </div>
        <div className="flex items-center space-x-2">
          <NavItem route="/overview" text="Overview" className="w-[8ch]" />
          <span className="h-5 w-0.5 bg-gray-700"></span>
        </div>
        <div className="flex items-center space-x-2">
          <NavItem route="/budgets" text="Budget" className="w-[7ch]" />
          <span className="h-5 w-0.5 bg-gray-700"></span>
        </div>
        <div className="flex items-center space-x-2">
          <NavItem route="/account" text="Account" className="w-[7ch]" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
