import { Link, useLocation } from "react-router-dom";

const NavItem = ({ text, route }) => {
  const location = useLocation();
  const isActive = location.pathname === route;

  return (
    <Link to={route}>
      <h2
        className={`transition-all hover:cursor-pointer hover:font-semibold ${
          isActive ? "font-semibold" : ""
        }`}
      >
        {text}
      </h2>
    </Link>
  );
};

export default NavItem;
