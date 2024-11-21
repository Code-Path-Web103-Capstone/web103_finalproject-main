import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const NavItem = ({ text, route, className }) => {
  const location = useLocation();
  const isActive = location.pathname === route;

  return (
    <Link to={route}>
      <div className={twMerge("flex justify-center py-0.5", className)}>
        <h2
          className={twMerge(
            "transition-all hover:cursor-pointer hover:font-semibold",
            isActive ? "font-semibold" : "font-light"
          )}
        >
          {text}
        </h2>
      </div>
    </Link>
  );
};

export default NavItem;
