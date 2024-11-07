import { Link } from "react-router-dom";

const NavItem = ({ text, route }) => {
  return (
    <Link to={route}>
      <h2 className="transition-all hover:cursor-pointer hover:font-semibold">
        {text}
      </h2>
    </Link>
  );
};

export default NavItem;
