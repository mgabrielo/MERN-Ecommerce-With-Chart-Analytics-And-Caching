import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import SignUpPage from "./pages/signup";
import LogInPage from "./pages/login";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useCartStore } from "./store/useCartStore";
import AdminDashBoard from "./pages/admin-dashboard";
import CategoryPage from "./pages/category";
import NotFoundPage from "./pages/not-found";
import CartPage from "./pages/cart";
import PurchaseSuccessPage from "./pages/purchase-success";
import PurchaseCancelPage from "./pages/purchase-cancelled";

function App() {
  const { user, checkAuth } = useUserStore();
  const { getCartItems, cart } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-teal-700" />
      </div>
      <div className="relative z-50 pt-18">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <SignUpPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <LogInPage />}
          />
          <Route
            path="/admin-dashboard/*"
            element={
              user && user?.role == "admin" ? (
                <AdminDashBoard />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccessPage /> : <LogInPage />}
          />
          <Route
            path="/purchase-cancelled"
            element={user ? <PurchaseCancelPage /> : <LogInPage />}
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to={"/login"} />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
