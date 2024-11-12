import { useUser } from "../../services/context";
import { Link } from "react-router-dom";

const LoginButton = () => {
  const { isLoggedIn, logout } = useUser();
  return (
    <div>
      {!isLoggedIn ? (
        <Link
          to="/login"
          className="flex h-12 items-center justify-center rounded-lg bg-[#A5A5A5] px-4 py-2 text-lg font-semibold text-[#D9D9D9] hover:bg-[#777777] focus:outline-none"
        >
          Login
        </Link>
      ) : (
        <button
          onClick={logout}
          className="flex h-12 items-center justify-center rounded-lg bg-[#A5A5A5] px-4 py-2 text-lg font-semibold text-[#D9D9D9] hover:bg-[#777777] focus:outline-none"
        >
          Sign out
        </button>
      )}
    </div>
  );
};

export default LoginButton;
