import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative flex w-full items-center">
      <h1 className="mx-auto mb-5 mt-10 font-anonymous text-6xl font-bold">
        <Link to="/"> gobudget.</Link>
      </h1>
    </div>
  );
};

export default Header;
