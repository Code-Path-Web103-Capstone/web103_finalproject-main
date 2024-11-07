import { Link } from "react-router-dom";
import { useUser } from "../services/context";
import { GiHamburgerMenu } from "react-icons/gi";

const SideNav = () => {
  const { user, isLoggedIn } = useUser();

  return (
    <div className="flex w-96 flex-col border-r-2 border-black">
      <div className="flex items-center justify-between px-12 py-12">
        <Link
          to="/auth/login"
          className="flex h-16 items-center justify-center rounded-lg bg-[#A5A5A5] px-16 py-5 text-3xl font-semibold text-[#D9D9D9] hover:bg-[#777777] focus:outline-none"
        >
          Login
        </Link>
        <GiHamburgerMenu className="size-10" />
      </div>
      <div className="space-y-4 px-10 text-2xl font-bold">
        <h2>Home</h2>
        <h2>Create Budget</h2>
        <h2>Dashboard</h2>
        <h2>Account</h2>
        <h2>Overview</h2>
      </div>
      {/* Test for User */}
      <div className="m-10 border-2 border-red-600 p-14">
        <h1>Welcome to the Landing Page</h1>
        {isLoggedIn ? (
          <div>
            <p>Logged in as: {user?.email}</p>
            <p>User ID: {user?.id}</p>
            <p>Role: {user?.role}</p>
          </div>
        ) : (
          <p>Please sign up or log in.</p>
        )}
      </div>
    </div>
  );
};

export default SideNav;
