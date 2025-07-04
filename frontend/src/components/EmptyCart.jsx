import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4 py-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <ShoppingCart className="size-20  text-gray-200" />
      <h3 className="text-2xl font-semibold"> Your Cart is Empty</h3>
      <p className="text-gray-400">
        Looks like you {"haven't"} added products to your cart.
      </p>
      <Link
        to={"/"}
        className="mt-4 rounded-md bg-emerald-600 px-6 py-2 text-white transition-colors hover:bg-emerald-500"
      >
        Start Shopping
      </Link>
    </motion.div>
  );
};

export default EmptyCart;
