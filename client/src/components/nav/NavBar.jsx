import { useUser } from "../../services/context";
import NavItem from "./NavItem";

const SideNav = () => {
  const { user, isLoggedIn, logout } = useUser();

  return (
    <div className="mb-10 mt-5 flex w-auto rounded-md border-2 border-black">
      <div className="flex items-center space-x-4 px-10 font-anonymous text-2xl font-light">
        <NavItem route="/dashboard" text="Dashboard" />
        <span className="h-5 w-0.5 bg-gray-700"></span>
        <NavItem route="/overview" text="Overview" />
        <span className="h-5 w-0.5 bg-gray-700"></span>
        <NavItem route="/budgets" text="Budget" />
        {/* <span className="h-5 w-0.5 bg-gray-700"></span>
        <NavItem route="/create-budget" text="New Budget" /> */}
        <span className="h-5 w-0.5 bg-gray-700"></span>
        <NavItem route="/account" text="Account" />
      </div>
    </div>
  );
};

export default SideNav;
