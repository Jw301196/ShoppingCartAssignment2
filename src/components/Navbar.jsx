import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalCount } = useCart();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Shopping Paradise
        </Link>
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
          >
            Products
          </NavLink>
          <Link to="/cart" className="relative inline-flex items-center">
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalCount > 0 && (
              <span
                aria-label="cart-count"
                className="absolute -top-3 -right-2 text-xs bg-indigo-600 text-white rounded-full px-1.5 py-0.5"
              >
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
