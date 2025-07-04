import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { useCartStore } from "../../store/useCartStore";
import { ArrowRight, CheckCircle } from "lucide-react";

const PurchaseSuccessPage = () => {
  const { clearCartItems } = useCartStore();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const hnadleCheckOutSuccess = async () => {
    try {
      await axiosInstance.post("payments/checkout-success", { sessionId });
      clearCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      hnadleCheckOutSuccess();
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-md overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-400 size-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
            Purchase Successful
          </h1>

          <Link
            to={"/"}
            className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-500 font-bold py-2 px-4 rounded-lg
                  flex items-center justify-center"
          >
            Continue Shopping
            <ArrowRight className="size-5" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
