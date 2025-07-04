import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, UserPlus, UserLock, LogOut, Lock } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user && user?.role === "admin";

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40
        transition-all duration-300 border-b border-emerald-800
        `}
    >
      <div className="container flex justify-between mx-auto px-4 py-3">
        <Link
          to={"/"}
          className={`flex text-2xl font-bold text-emerald-500 items-center space-x-2`}
        >
          Ecommerce
        </Link>
        <nav className="flex flex-wrap items-center gap-4 mt-1.5">
          <Link
            to={"/"}
            className="text-gray-300 hover:text-emerald-500 transition-all duration-300 ease-in-out"
          >
            Home
          </Link>

          {user && (
            <Link
              to={"/cart"}
              className="relative group text-gray-300 hover:text-emerald-500 transition-all duration-300 ease-in-out"
            >
              <span className="hidden sm:inline">Cart</span>
              <ShoppingCart
                size={20}
                className="inline-block ml-1 group-hover:text-emerald-400"
              />
              <span
                className={`absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full px-1.5 py-0.5 
                            text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out
                            `}
              >
                {cart && cart?.length > 0 ? cart.length : 0}
              </span>
            </Link>
          )}
          {isAdmin && (
            <Link
              to={"/admin-dashboard"}
              className={`bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
                           transition duration-300 ease-in-out flex items-center`}
            >
              <Lock className="inline-block mr-2" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}
          {user && user._id ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
                navigate("/login");
              }}
              className={`py-1 px-4 bg-gray-700 hover:bg-gray-600 rounded-md flex items-center transition duration-300 ease-in-out`}
            >
              <LogOut size={16} className="mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <>
              <Link
                to={"/signup"}
                className={`bg-transparent hover:bg-gray-200 hover:text-emerald-700 text-emerald-500 px-3 py-1 rounded-md font-medium
                         transition duration-300 ease-in-out flex items-center`}
              >
                <UserPlus className="inline-block mr-2" size={18} />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
              <Link
                to={"/login"}
                className={`bg-transparent hover:bg-gray-200 hover:text-emerald-700 text-emerald-500 px-3 py-1 rounded-md font-medium
                         transition duration-300 ease-in-out flex items-center`}
              >
                <UserLock className="inline-block mr-2" size={18} />
                <span className="hidden sm:inline">Log In</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
