import React from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISH_KEY } from "../config/utils";
import axiosInstance from "../config/axiosInstance";

const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);

const OrderSummary = () => {
  const { total, subTotal, coupon, isCouponApplied, cart, removeFromCart } =
    useCartStore();

  const savings = useMemo(() => {
    return subTotal - total;
  }, [total, subTotal]);

  const formattedSubTotal = useMemo(() => {
    return subTotal.toFixed(2);
  }, [subTotal]);

  const formattedTotal = useMemo(() => {
    return total.toFixed(2);
  }, [total]);

  const handleCartPayment = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    const res = await axiosInstance.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });
    console.log({ session_result: res.data });
    const result = await stripe.redirectToCheckout({
      sessionId: res.data.id,
    });
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <p className="text-xl font-semibold text-emerald-500">Order Summary</p>
      OrderSummary
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              Original Price
            </dt>
            <dt className="text-base font-medium text-white">
              ${formattedSubTotal}
            </dt>
          </dl>
          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dt className="text-base font-medium text-white">-${savings}</dt>
            </dl>
          )}
          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">
                Coupon ({coupon.code})
              </dt>
              <dt className="text-base font-medium text-emerald-500">
                -{coupon.discountPercentage}
              </dt>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600">
            <dt className="text-base font-normal text-gray-100">Total</dt>
            <dt className="text-base font-medium text-emerald-500">
              ${formattedTotal}
            </dt>
          </dl>
        </div>
        <motion.button
          className={`flex w-full items-center justify-center rounded-lg bg-emerald-500 px-5 py-2 text-sm font-medium
                text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400`}
          whileHover={{ scale: 1.05 }}
          whileTop={{ scale: 0.95 }}
          onClick={handleCartPayment}
        >
          <p>Proceed To Checkout</p>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
