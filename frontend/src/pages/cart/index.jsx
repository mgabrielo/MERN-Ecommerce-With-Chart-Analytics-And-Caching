import { motion } from "framer-motion";
import { useCartStore } from "../../store/useCartStore";
import EmptyCart from "../../components/EmptyCart";
import FeaturedPurchase from "../../components/FeaturedPurchase";
import CartItem from "../../components/CartItem";
import OrderSummary from "../../components/OrderSummary";
import GiftCouponCard from "../../components/GiftCouponCard";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="w-full py-10 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-1">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items=start xl:gap-8">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
            {cart.length > 0 && <FeaturedPurchase />}
          </motion.div>
          {cart.length > 0 && (
            <motion.div
              className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <OrderSummary />
              <GiftCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
