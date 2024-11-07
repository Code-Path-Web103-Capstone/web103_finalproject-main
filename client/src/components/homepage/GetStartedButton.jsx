import { Link } from "react-router-dom";
import { useUser } from "../../services/context.jsx";

const GetStartedButton = () => {
  const { isLoggedIn } = useUser();
  return (
    <div className="flex w-full items-center justify-center">
      {/* Link to create budget page unless user is not logged in */}
      <Link
        to={isLoggedIn ? "/createBudget" : "/auth/login"}
        className="flex w-4/6 items-center justify-center rounded-lg bg-[#778DA9] px-4 py-5 text-3xl font-semibold text-[#D9D9D9] hover:cursor-pointer hover:bg-[#3A405A]"
      >
        Get Started
      </Link>
    </div>
  );
};

export default GetStartedButton;
