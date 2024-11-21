import { Link } from "react-router-dom";
import { useUser } from "../../services/context.jsx";

const GetStartedButton = () => {
  const { isLoggedIn } = useUser();
  return (
    <Link
      to={isLoggedIn ? "/budgets" : "/login"}
      className="bg-budgetblue flex w-4/6 items-center justify-center rounded-lg px-4 py-5 text-3xl font-semibold text-[#D9D9D9] hover:cursor-pointer hover:bg-[3A405A#]"
    >
      Get Started
    </Link>
  );
};

export default GetStartedButton;
