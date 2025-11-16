import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="w-full px-1 bg-slate-100">
      <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
        <Link to="/" className="font-bold text-2xl">
          Dev PetShop
        </Link>
        <Link to="/cart" className="relative">
          <FiShoppingCart size={24} />
          <span className="absolute -top-3 -right-3 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
            2
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
