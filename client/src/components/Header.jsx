import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative flex w-full items-center">
      <h1 className="font-anonymous mx-auto my-10 text-6xl font-bold">
        <Link to="/"> gobudget.</Link>
      </h1>
    </div>
  );
};

export default Header;
